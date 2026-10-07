#!/usr/bin/env python3
"""넥슨 공식 영웅 통계를 수집해 frontend의 heroRates.ts를 재생성한다.

실행: python3 scripts/update-hero-rates.py   (또는 npm run update:rates)
필요: python3, curl

패치가 적용될 때마다 돌려서 티어리스트 데이터를 갱신한다. 실행 후 git diff로 변경 내역을
확인하고, 함께 갱신되는 HERO_RATES_CHECKED_AT 날짜가 맞는지 보면 된다.

출처 페이지가 Nuxt SSR이라 응답 HTML의 <script type="application/json"> 안에 있는 flat pool을
파싱한다. pool 안의 객체는 필드 값을 '인덱스'로 들고 있고, 그 인덱스가 가리키는 자리에 실제
리터럴이 들어있다. 인덱스를 재귀로 따라가면 엉뚱한 객체가 잡히므로 반드시 한 단계만 해석한다.
밴률은 페이지 화면에 컬럼으로 노출되지 않지만 이 페이로드에는 들어있다.
"""
from __future__ import annotations

import datetime
import json
import pathlib
import re
import subprocess
import sys
import time

BASE_URL = "https://overwatch.nexon.com/hero/rate"
REGIONS = ["korea", "asia", "americas", "europe"]
TIERS = ["all", "grandmaster", "master", "diamond", "emerald", "platinum", "gold", "silver", "bronze"]
REQUEST_DELAY_SEC = 0.4

OUT_PATH = pathlib.Path(__file__).resolve().parent.parent / "frontend/src/features/tier-list/data/heroRates.ts"

Rates = dict[str, dict[str, float]]


def fetch(region: str, tier: str) -> str:
    # python urllib은 SSL 프록시 환경에서 인증서 검증에 실패하는 경우가 있어 curl을 쓴다.
    url = f"{BASE_URL}?role=all&rq=2&rank={tier}&map=all&input=pc&region={region}"
    proc = subprocess.run(
        ["curl", "-sS", "--max-time", "30", "-A", "Mozilla/5.0", url],
        capture_output=True,
        text=True,
        check=True,
    )
    return proc.stdout


def parse(html: str) -> Rates:
    match = re.search(r'<script type="application/json"[^>]*>(.*?)</script>', html, re.S)
    if not match:
        raise RuntimeError("SSR 페이로드를 찾지 못했습니다. 페이지 구조가 바뀌었을 수 있습니다.")
    pool = json.loads(match.group(1))

    def literal(index: object) -> object:
        if not isinstance(index, int) or not (0 <= index < len(pool)):
            return None
        return pool[index]

    rates: Rates = {}
    for item in pool:
        if not (isinstance(item, dict) and {"heroId", "winRate", "pickRate", "banRate"} <= item.keys()):
            continue
        hero_id = literal(item["heroId"])
        win, pick, ban = (literal(item[k]) for k in ("winRate", "pickRate", "banRate"))
        if not isinstance(hero_id, str):
            continue
        if not all(isinstance(v, (int, float)) for v in (win, pick, ban)):
            continue  # 표본이 없는 조합
        rates[hero_id] = {"winRate": float(win), "pickRate": float(pick), "banRate": float(ban)}
    return rates


def number(value: float) -> str:
    """43.0 -> '43', 43.5 -> '43.5'"""
    return str(int(value)) if float(value).is_integer() else str(value)


def hero_key(hero_id: str) -> str:
    return hero_id if hero_id.isalnum() else f"'{hero_id}'"


def render(data: dict[str, dict[str, Rates]], checked_at: str, iso_date: str) -> str:
    out: list[str] = []
    add = out.append
    add("export interface HeroRate {")
    add("  winRate: number;")
    add("  pickRate: number;")
    add("  banRate: number;")
    add("}")
    add("")
    add("export type RateRegion = " + " | ".join(f"'{r}'" for r in REGIONS) + ";")
    add("export type RateTier = " + " | ".join(f"'{t}'" for t in TIERS) + ";")
    add("")
    add(f"// 출처: {BASE_URL}?role=all&rq=2&rank={{Tier}}&map=all&input=pc&region={{Region}}")
    add(f"// (PC, 경쟁전 - 역할 고정, 지역·등급별 / {checked_at} 수집)")
    add("//")
    add("// 넥슨 공식 영웅 통계 페이지에서 수집한다. 블리자드 글로벌 페이지(overwatch.blizzard.com/rates)와 달리")
    add("// 여기는 '한국' 지역이 별도 항목으로 있어 국내 서버 수치를 그대로 쓸 수 있다. 밴률은 화면에 컬럼으로")
    add("// 노출되지 않지만 페이지 SSR 페이로드에는 들어있어 함께 수집했다.")
    add("//")
    add("// 이 파일은 scripts/update-hero-rates.py 가 생성한다. 직접 수정하지 말 것.")
    add(f"export const HERO_RATES_SOURCE_URL = '{BASE_URL}';")
    add(f"export const HERO_RATES_CHECKED_AT = '{checked_at}';")
    add("/** 수집 시점(ISO). patchNotes의 version과 직접 비교하려고 표시용 문자열과 따로 둔다. */")
    add(f"export const HERO_RATES_COLLECTED_ON = '{iso_date}';")
    add("")
    add("export const HERO_RATES: Record<RateRegion, Record<RateTier, Record<string, HeroRate>>> = {")
    for region in REGIONS:
        add(f"  {region}: {{")
        for tier in TIERS:
            add(f"    {tier}: {{")
            heroes = data[region][tier]
            for hero_id in sorted(heroes):
                r = heroes[hero_id]
                add(
                    f"      {hero_key(hero_id)}: {{ winRate: {number(r['winRate'])}, "
                    f"pickRate: {number(r['pickRate'])}, banRate: {number(r['banRate'])} }},"
                )
            add("    },")
        add("  },")
    add("};")
    add("")
    return "\n".join(out)


def main() -> int:
    data: dict[str, dict[str, Rates]] = {}
    for region in REGIONS:
        data[region] = {}
        for tier in TIERS:
            rates = parse(fetch(region, tier))
            if not rates:
                print(f"  !! {region}/{tier}: 수집된 영웅이 없습니다. 중단합니다.", file=sys.stderr)
                return 1
            data[region][tier] = rates
            print(f"  {region}/{tier}: {len(rates)}명", file=sys.stderr)
            time.sleep(REQUEST_DELAY_SEC)

    today = datetime.date.today()
    checked_at = f"{today.year}년 {today.month}월 {today.day}일"
    OUT_PATH.write_text(render(data, checked_at, today.isoformat()), encoding="utf-8")

    total = sum(len(data[r][t]) for r in REGIONS for t in TIERS)
    print(f"\n{OUT_PATH} 갱신 완료 — {checked_at} 기준, {total}개 엔트리", file=sys.stderr)
    print("git diff 로 변경 내역을 확인하세요.", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
