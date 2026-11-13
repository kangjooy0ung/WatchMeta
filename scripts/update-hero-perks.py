#!/usr/bin/env python3
"""넥슨 영웅 상세 페이지 + owperks에서 특전 데이터를 모아 heroPerks.ts를 재생성한다.

실행: python3 scripts/update-hero-perks.py   (또는 npm run update:perks)
필요: python3, curl

특전 이름·설명·아이콘은 넥슨 공식 영웅 페이지(overwatch.nexon.com/hero/{id})에서,
커뮤니티 선호율은 owperks.com 역할별 페이지에서 가져온다. 패치로 특전이 교체되는 일이
잦으므로(예: 2026-10-07 아나 '혼미' -> '국소 마취') 패치 때마다 함께 돌릴 것.

넥슨 페이지는 Nuxt SSR이라 <script type="application/json"> 안의 flat pool을 파싱한다.
pool 안 객체는 필드 값을 인덱스로 들고 있고, 그 인덱스 자리에 실제 리터럴이 있다.
인덱스를 재귀로 따라가면 엉뚱한 객체가 잡히므로 한 단계만 해석한다.

아이콘은 넥슨 CDN과 블리자드 CDN이 같은 해시를 쓰므로, 기존 데이터와 맞추기 위해
블리자드 CDN(cloudfront) 주소로 바꿔서 저장한다.
"""
from __future__ import annotations

import datetime
import html as H
import json
import pathlib
import re
import subprocess
import sys
import time

HERO_LIST_URL = "https://overwatch.nexon.com/hero/list"
HERO_URL = "https://overwatch.nexon.com/hero/{hero_id}"
OWPERKS_URL = "https://owperks.com/ko/{role_path}"
NEXON_CDN = "https://sht-vod.dn.nexoncdn.co.kr/shpd-game/Hero/OW/"
BLIZZARD_CDN = "https://d15f34w2p8l1cc.cloudfront.net/overwatch/"
ROLE_PATHS = {"tank": "tanks", "damage": "damages", "support": "supports"}
REQUEST_DELAY_SEC = 0.3
# owperks 영웅 카드의 머리글. 색상 클래스는 역할마다 다르므로 색은 패턴에서 뺀다.
HERO_CARD_RE = re.compile(r'<h2 class="text-lg sm:text-xl md:text-2xl font-bold [^"]*">([^<]+)</h2>')

OUT_PATH = pathlib.Path(__file__).resolve().parent.parent / "frontend/src/features/perks/data/heroPerks.ts"


def fetch(url: str) -> str:
    proc = subprocess.run(
        ["curl", "-sS", "--max-time", "30", "-A", "Mozilla/5.0", url],
        capture_output=True,
        text=True,
        check=True,
    )
    return proc.stdout


def payload(html: str) -> list:
    match = re.search(r'<script type="application/json"[^>]*>(.*?)</script>', html, re.S)
    if not match:
        raise RuntimeError("SSR 페이로드를 찾지 못했습니다. 페이지 구조가 바뀌었을 수 있습니다.")
    return json.loads(match.group(1))


def hero_list() -> list[tuple[str, str]]:
    """(영웅 id, 표시 이름) 목록. 이름은 owperks 카드 제목과 맞추는 데 쓴다."""
    pool = payload(fetch(HERO_LIST_URL))

    def lit(i):
        return pool[i] if isinstance(i, int) and 0 <= i < len(pool) else None

    heroes = []
    for item in pool:
        if isinstance(item, dict) and {"id", "name", "slug", "role", "thumbnailUrl"} <= item.keys():
            hero_id, name = lit(item["id"]), lit(item["name"])
            if isinstance(hero_id, str) and isinstance(name, str):
                heroes.append((hero_id, H.unescape(name).strip()))
    return heroes


def hero_perks(hero_id: str) -> dict[str, list[dict]]:
    pool = payload(fetch(HERO_URL.format(hero_id=hero_id)))

    def lit(i):
        return pool[i] if isinstance(i, int) and 0 <= i < len(pool) else None

    out: dict[str, list[dict]] = {"minor": [], "major": []}
    for item in pool:
        if not (isinstance(item, dict) and {"category", "description", "iconUrl", "level", "name"} <= item.keys()):
            continue
        category, name, desc, icon = (lit(item[k]) for k in ("category", "name", "description", "iconUrl"))
        if category not in out or not isinstance(name, str):
            continue
        icon = icon.replace(NEXON_CDN, BLIZZARD_CDN) if isinstance(icon, str) else ""
        out[category].append({"name": H.unescape(name).strip(), "description": H.unescape(desc or "").strip(), "icon": icon})
    return out


def existing_rates() -> dict[str, dict[str, float]]:
    """현재 heroPerks.ts의 '영웅 id -> {특전 이름: 선호율}'. owperks 장애 시 폴백으로 쓴다."""
    if not OUT_PATH.exists():
        return {}
    out: dict[str, dict[str, float]] = {}
    for block in re.finditer(r"  '([a-z0-9-]+)': \{(.*?)\n  \},", OUT_PATH.read_text(encoding="utf-8"), re.S):
        rates = {
            m.group(1).replace("\\'", "'"): float(m.group(2))
            for m in re.finditer(r"\{ name: '((?:[^'\\]|\\')*)'.*?preferRate: ([0-9.]+) \}", block.group(2))
        }
        if rates:
            out[block.group(1)] = rates
    return out


def existing_checked_at() -> str | None:
    """현재 heroPerks.ts의 PERKS_CHECKED_AT 값. 선호율 폴백 시 날짜도 함께 유지한다."""
    if not OUT_PATH.exists():
        return None
    m = re.search(r"PERKS_CHECKED_AT = '([^']*)'", OUT_PATH.read_text(encoding="utf-8"))
    return m.group(1) if m else None


def prefer_rates(hero_names: dict[str, str]) -> tuple[dict[str, dict[str, float]], bool]:
    """owperks 역할 페이지에서 '영웅 id -> {특전 이름: 선호율(%)}'을 모은다.

    특전 이름만으로 키를 만들면 안 된다. 서로 다른 영웅이 같은 이름의 특전을 갖는 경우가
    있고(예: D.Mon '집중 융합' 49% vs D.Va '집중 융합' 30%, 주노/시에라 '대상 포착'),
    이름만 쓰면 나중에 읽은 영웅의 값이 앞선 영웅을 덮어써 조용히 틀린 수치가 박힌다.

    그래서 영웅 카드 단위로 끊어서 읽는다. 카드 경계는 영웅 이름이 담긴 h2다. 상세 페이지
    링크(/ko/{role}/{slug})는 신규 영웅에 없을 수 있어(제트팩 캣) 경계로 쓰지 않는다.

    owperks는 서드파티라 가끔 접속이 막힌다. 그때 전체 작업을 중단하면 공식 데이터(이름·설명·
    아이콘) 갱신까지 함께 막히므로, 실패하면 기존 파일의 선호율을 그대로 유지한다.

    (선호율, 폴백했는지)를 돌려준다. 화면의 '{날짜} 확인' 문구는 선호율에 붙는 설명이라,
    폴백했다면 날짜도 기존 값을 유지해야 한다 — 안 그러면 오늘 집계를 받은 것처럼 보인다.
    """
    hero_id_by_name = {name: hero_id for hero_id, name in hero_names.items()}
    rates: dict[str, dict[str, float]] = {}
    unknown: list[str] = []
    for role_path in ROLE_PATHS.values():
        try:
            html = fetch(OWPERKS_URL.format(role_path=role_path))
        except subprocess.CalledProcessError as exc:
            print(f"  !! owperks {role_path} 접속 실패(exit {exc.returncode}) — 기존 선호율을 유지합니다.",
                  file=sys.stderr)
            return existing_rates(), True
        cards = list(HERO_CARD_RE.finditer(html))
        if not cards:
            print(f"  !! owperks {role_path}: 영웅 카드를 찾지 못했습니다. 페이지 구조가 바뀌었을 수 있습니다.",
                  file=sys.stderr)
            return existing_rates(), True
        for index, card in enumerate(cards):
            name = H.unescape(card.group(1)).strip()
            hero_id = hero_id_by_name.get(name)
            if hero_id is None:
                unknown.append(name)
                continue
            end = cards[index + 1].start() if index + 1 < len(cards) else len(html)
            rates[hero_id] = card_rates(html[card.end() : end])
        time.sleep(REQUEST_DELAY_SEC)
    if unknown:
        print(f"  !! owperks 영웅 이름을 매칭하지 못했습니다: {', '.join(unknown)}", file=sys.stderr)
    return rates, False


def card_rates(card_html: str) -> dict[str, float]:
    """영웅 카드 한 장에서 '특전 이름 -> 선호율(%)'을 뽑는다."""
    text = H.unescape(re.sub(r"<[^>]+>", "\n", card_html))
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    out: dict[str, float] = {}
    for i, line in enumerate(lines):
        if line != "커뮤니티 선택" or i + 2 >= len(lines):
            continue
        name = lines[i + 1]
        # 이름과 퍼센트 사이에 '신규'·'업데이트' 같은 배지가 끼기도 한다(패치로 특전이
        # 바뀐 직후). 위치를 고정하지 말고 몇 줄 안에서 첫 퍼센트를 찾는다.
        for candidate in lines[i + 2 : i + 5]:
            m = re.fullmatch(r"(\d+(?:\.\d+)?)%", candidate)
            if m:
                out[name] = float(m.group(1))
                break
    return out


def ts_string(value: str) -> str:
    return "'" + value.replace("\\", "\\\\").replace("'", "\\'") + "'"


def render(data: dict[str, dict[str, list[dict]]], checked_at: str) -> str:
    out: list[str] = []
    add = out.append
    add("// 특전 이름·설명·아이콘 출처: 넥슨 공식 영웅 페이지 (https://overwatch.nexon.com/hero/{heroId})")
    add("// 커뮤니티 선호율(preferRate) 출처: owperks.com 역할별 페이지의 '커뮤니티 선택' 집계. 실제 게임 내")
    add("// 채용률이 아니라 플레이어들이 '가장 자주 고른다'고 응답한 비율이며, 두 특전 중 나머지 하나는")
    add("// (100 - preferRate)로 환산했다.")
    add("//")
    add("// 아이콘 주소는 넥슨 CDN과 블리자드 CDN이 같은 해시를 쓰므로 기존 데이터와 맞춰 블리자드 CDN으로 저장한다.")
    add("// 패치로 특전이 통째로 교체되는 일이 잦으니(예: 2026-10-07 아나 '혼미' → '국소 마취') 패치마다 갱신할 것.")
    add("//")
    add("// 이 파일은 scripts/update-hero-perks.py 가 생성한다. 직접 수정하지 말 것.")
    add("")
    add("export interface Perk {")
    add("  name: string;")
    add("  description: string;")
    add("  icon: string;")
    add("  /** owperks.com 커뮤니티 투표 기준 이 특전을 고른다고 응답한 비율(%). 집계 전이면 undefined. */")
    add("  preferRate?: number;")
    add("}")
    add("")
    add("export interface HeroPerks {")
    add("  /** 레벨 2에 하나 선택하는 마이너 특전 2종 */")
    add("  minor: [Perk, Perk];")
    add("  /** 레벨 3에 하나 선택하는 메이저 특전 2종 */")
    add("  major: [Perk, Perk];")
    add("}")
    add("")
    add("export const PERKS_SOURCE_URL = 'https://overwatch.nexon.com/hero/list';")
    add("export const PERKS_PREFER_SOURCE_URL = 'https://owperks.com';")
    add(f"export const PERKS_CHECKED_AT = '{checked_at}';")
    add("")
    add("export const HERO_PERKS: Record<string, HeroPerks> = {")
    for hero_id in sorted(data):
        perks = data[hero_id]
        add(f"  '{hero_id}': {{")
        for tier in ("minor", "major"):
            add(f"    {tier}: [")
            for perk in perks[tier]:
                fields = [
                    f"name: {ts_string(perk['name'])}",
                    f"description: {ts_string(perk['description'])}",
                    f"icon: {ts_string(perk['icon'])}",
                ]
                if perk.get("preferRate") is not None:
                    rate = perk["preferRate"]
                    fields.append(f"preferRate: {int(rate) if float(rate).is_integer() else rate}")
                add("      { " + ", ".join(fields) + " },")
            add("    ],")
        add("  },")
    add("};")
    add("")
    return "\n".join(out)


def main() -> int:
    heroes = hero_list()
    print(f"영웅 {len(heroes)}명", file=sys.stderr)

    rates, rates_stale = prefer_rates(dict(heroes))
    print(f"owperks 선호율 {sum(len(v) for v in rates.values())}건 / 영웅 {len(rates)}명", file=sys.stderr)

    data: dict[str, dict[str, list[dict]]] = {}
    for hero_id, _ in heroes:
        perks = hero_perks(hero_id)
        if len(perks["minor"]) != 2 or len(perks["major"]) != 2:
            print(f"  !! {hero_id}: 특전이 2+2가 아닙니다({len(perks['minor'])}+{len(perks['major'])}). 중단합니다.", file=sys.stderr)
            return 1
        hero_rates = rates.get(hero_id, {})
        for tier in ("minor", "major"):
            pair = perks[tier]
            known = [p for p in pair if p["name"] in hero_rates]
            if not known:
                continue
            for perk in known:
                perk["preferRate"] = hero_rates[perk["name"]]
            # owperks는 보통 두 특전 값을 모두 싣지만, 한쪽만 있으면 나머지는 100 - x 로 환산한다.
            if len(known) == 1:
                idx = pair.index(known[0])
                pair[1 - idx]["preferRate"] = round(100 - known[0]["preferRate"], 1)
        data[hero_id] = perks
        print(f"  {hero_id}: minor/major 2+2", file=sys.stderr)
        time.sleep(REQUEST_DELAY_SEC)

    today = datetime.date.today()
    checked_at = f"{today.year}년 {today.month}월 {today.day}일"
    # 화면의 '{날짜} 확인'은 선호율 집계에 붙는 문구다. owperks가 죽어 기존 값을 쓴 경우
    # 날짜까지 오늘로 올리면 오늘 집계를 받아온 것처럼 보이므로, 기존 날짜를 그대로 둔다.
    if rates_stale:
        previous = existing_checked_at()
        if previous:
            print(f"  !! 선호율이 기존 값({previous} 확인)이라 확인 날짜도 그대로 둡니다.", file=sys.stderr)
            checked_at = previous
    OUT_PATH.write_text(render(data, checked_at), encoding="utf-8")
    rated = sum(1 for h in data.values() for t in ("minor", "major") for p in h[t] if p.get("preferRate") is not None)
    print(f"\n{OUT_PATH} 갱신 완료 — {checked_at} 기준, 영웅 {len(data)}명 / 선호율 {rated}건", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
