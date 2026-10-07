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


def hero_ids() -> list[str]:
    pool = payload(fetch(HERO_LIST_URL))

    def lit(i):
        return pool[i] if isinstance(i, int) and 0 <= i < len(pool) else None

    ids = []
    for item in pool:
        if isinstance(item, dict) and {"id", "name", "slug", "role", "thumbnailUrl"} <= item.keys():
            hero_id = lit(item["id"])
            if isinstance(hero_id, str):
                ids.append(hero_id)
    return ids


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


def prefer_rates() -> dict[str, float]:
    """owperks 역할 페이지에서 '특전 이름 -> 선호율(%)'을 모은다."""
    rates: dict[str, float] = {}
    for role_path in ROLE_PATHS.values():
        html = fetch(OWPERKS_URL.format(role_path=role_path))
        text = H.unescape(re.sub(r"<[^>]+>", "\n", html))
        lines = [l.strip() for l in text.split("\n") if l.strip()]
        for i, line in enumerate(lines):
            if line != "커뮤니티 선택" or i + 2 >= len(lines):
                continue
            name, pct = lines[i + 1], lines[i + 2]
            m = re.fullmatch(r"(\d+(?:\.\d+)?)%", pct)
            if m:
                rates[name] = float(m.group(1))
        time.sleep(REQUEST_DELAY_SEC)
    return rates


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
    ids = hero_ids()
    print(f"영웅 {len(ids)}명", file=sys.stderr)

    rates = prefer_rates()
    print(f"owperks 선호율 {len(rates)}건", file=sys.stderr)

    data: dict[str, dict[str, list[dict]]] = {}
    for hero_id in ids:
        perks = hero_perks(hero_id)
        if len(perks["minor"]) != 2 or len(perks["major"]) != 2:
            print(f"  !! {hero_id}: 특전이 2+2가 아닙니다({len(perks['minor'])}+{len(perks['major'])}). 중단합니다.", file=sys.stderr)
            return 1
        for tier in ("minor", "major"):
            pair = perks[tier]
            known = [p for p in pair if p["name"] in rates]
            if known:
                # 한쪽 값만 공개되므로 나머지는 100 - x 로 환산한다.
                rate = rates[known[0]["name"]]
                idx = pair.index(known[0])
                pair[idx]["preferRate"] = rate
                pair[1 - idx]["preferRate"] = round(100 - rate, 1)
        data[hero_id] = perks
        print(f"  {hero_id}: minor/major 2+2", file=sys.stderr)
        time.sleep(REQUEST_DELAY_SEC)

    today = datetime.date.today()
    checked_at = f"{today.year}년 {today.month}월 {today.day}일"
    OUT_PATH.write_text(render(data, checked_at), encoding="utf-8")
    rated = sum(1 for h in data.values() for t in ("minor", "major") for p in h[t] if p.get("preferRate") is not None)
    print(f"\n{OUT_PATH} 갱신 완료 — {checked_at} 기준, 영웅 {len(data)}명 / 선호율 {rated}건", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
