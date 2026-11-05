#!/usr/bin/env python3
"""넥슨 패치 노트를 받아 patchNotes.ts에 붙여넣을 TS 항목으로 출력한다.

실행:
  python3 scripts/fetch-patch-note.py            # 최신 패치 노트 목록만 보여준다
  python3 scripts/fetch-patch-note.py 848        # newsNo 848을 TS 항목으로 출력
필요: python3, curl

출력은 stdout으로 나오므로 확인 후 patchNotes.ts의 PATCH_NOTES 배열에 시간순으로
직접 붙여넣는다. 패치 노트는 항목마다 구조가 제각각이라 자동 삽입까지는 하지 않는다.

파싱 시 주의점(실제로 당한 것들):
- Nuxt SSR 페이로드의 flat pool에서 인덱스는 '한 단계만' 해석한다. 재귀로 따라가면
  엉뚱한 객체가 잡힌다.
- 영웅 블록의 generalUpdates 안은 [<ul>] 또는 [<p>라벨</p><ul>] 쌍이 여러 번 반복된다.
  한 덩어리로 합치면 서로 다른 특전의 불릿이 섞인다.
- 스타디움 아이템처럼 '항목명 + 불릿' 구조인 그룹은 항목명을 불릿 앞에 붙인다. 안 그러면
  "신규", "비용 9,000" 같은 맥락 없는 줄만 남는다.
"""
from __future__ import annotations

import html as H
import json
import pathlib
import re
import subprocess
import sys

LIST_URL = "https://overwatch.nexon.com/news/patchnotes"
DETAIL_URL = "https://overwatch.nexon.com/news/patchnotes/{news_no}/{slug}"
HEROES_TS = pathlib.Path(__file__).resolve().parent.parent / "frontend/src/constants/heroes.ts"


def fetch(url: str) -> str:
    proc = subprocess.run(
        ["curl", "-sS", "--max-time", "30", "-A", "Mozilla/5.0", url],
        capture_output=True, text=True, check=True,
    )
    return proc.stdout


def payload(html: str) -> list:
    m = re.search(r'<script type="application/json"[^>]*>(.*?)</script>', html, re.S)
    if not m:
        raise RuntimeError("SSR 페이로드를 찾지 못했습니다. 페이지 구조가 바뀌었을 수 있습니다.")
    return json.loads(m.group(1))


def text(s: str) -> str:
    """태그를 걷어내고 공백을 정리한다. &nbsp;(U+00A0)도 일반 공백으로 바꾼다."""
    plain = H.unescape(re.sub(r"<[^>]+>", "", s)).replace("\u00a0", " ")
    return re.sub(r"\s+", " ", plain).strip()


def bullets(block: str) -> list[str]:
    return [text(li) for li in re.findall(r"<li[^>]*>(.*?)</li>", block, re.S) if text(li)]


def hero_meta() -> dict[str, dict]:
    src = HEROES_TS.read_text(encoding="utf-8")
    out = {}
    for m in re.finditer(r"\{ id: '([^']+)', name: '([^']+)', role: '([^']+)', portraitUrl: '([^']*)'", src):
        out[m.group(2)] = {"role": m.group(3), "portrait": m.group(4)}
    return out


def list_notes() -> list[dict]:
    pool = payload(fetch(LIST_URL))

    def lit(i):
        return pool[i] if isinstance(i, int) and 0 <= i < len(pool) else None

    notes = []
    for item in pool:
        if isinstance(item, dict) and {"newsNo", "title", "slug"} <= item.keys():
            title = lit(item["title"])
            if title and "패치" in str(title):
                notes.append({"newsNo": lit(item["newsNo"]), "title": title, "slug": lit(item["slug"])})
    return notes


def parse_hero(block: str) -> dict:
    name = re.search(r'PatchNotesHeroUpdate-name">(.*?)</h5>', block, re.S)
    dev = re.search(r'PatchNotes-dev PatchNotesHeroUpdate-dev">\s*<p>(.*?)</p>', block, re.S)
    hero = {"hero": text(name.group(1)) if name else "?", "changes": []}
    if dev:
        hero["description"] = re.sub(r"^개발자의?\s*의견:\s*", "", re.sub(r"^개발자의?\s*의견:\s*", "", text(dev.group(1))))

    gen = re.search(
        r'PatchNotesHeroUpdate-generalUpdates">(.*?)(?=<div class="PatchNotesHeroUpdate-abilitiesList"|</div></div></div>)',
        block, re.S)
    if gen:
        for label_html, ul_html in re.findall(r"(?:<p>(.*?)</p>\s*)?(<ul>.*?</ul>)", gen.group(1), re.S):
            b = bullets(ul_html)
            if not b:
                continue
            entry = {"bullets": b}
            label = text(label_html) if label_html else ""
            if label:
                entry["ability"] = label
            hero["changes"].append(entry)

    # 닫는 </div>가 몇 개인지로 끊으면 마지막 기술 블록이 통째로 날아간다(실제로 독트린의
    # '영겁의 홀'이 빠졌다). 다음 블록이 시작되기 직전까지로 끊는다.
    for ab in re.findall(
        r'<div class="PatchNotesAbilityUpdate">(.*?)(?=<div class="PatchNotesAbilityUpdate">|$)', block, re.S):
        # 기술명이 -name div에 있는 게 보통이지만, detailList 안에 <p><strong>이름</strong></p>로
        # 들어오는 블록도 있다(실제로 독트린 '영겁의 홀'이 이 형태라 통째로 누락됐었다).
        nm = re.search(r'PatchNotesAbilityUpdate-name">(.*?)</div>', ab, re.S)
        if not nm:
            nm = re.search(r"<p><strong>(.*?)</strong></p>", ab, re.S)
        b = bullets(ab)
        if nm:
            label = text(nm.group(1))
            # 이름이 <strong>으로 온 경우 그 줄이 불릿에 섞여 들어오지 않는지 확인한다.
            b = [x for x in b if x != label]
        if nm and b:
            hero["changes"].append({"ability": text(nm.group(1)), "bullets": b})
    return hero


def parse_sections(body: str) -> list[dict]:
    parts = re.split(r'<h4 class="PatchNotes-sectionTitle">(.*?)</h4>', body, flags=re.S)
    sections = []
    for i in range(1, len(parts), 2):
        title, content = text(parts[i]), (parts[i + 1] if i + 1 < len(parts) else "")
        sec = {"title": title}

        heroes = [parse_hero(b) for b in re.findall(
            r'<div class="PatchNotesHeroUpdate">(.*?)(?=<div class="PatchNotesHeroUpdate">|$)', content, re.S)]
        heroes = [h for h in heroes if h["changes"]]
        if heroes:
            sec["heroes"] = heroes

        groups = []
        for g in re.findall(r'<div class="PatchNotesGeneralUpdate">(.*?)(?=<div class="PatchNotesGeneralUpdate">|$)',
                            content, re.S):
            gt = re.search(r'PatchNotesGeneralUpdate-title">(.*?)</div>', g, re.S)
            desc = re.search(r'PatchNotesGeneralUpdate-description">(.*?)(?=<div class="PatchNotes-dev|</div></div>)', g, re.S)
            inner = desc.group(1) if desc else g
            labeled = re.findall(r"<p><strong>(.*?)</strong></p>\s*(<ul>.*?</ul>)", inner, re.S)
            if labeled:
                bs = [f"{text(lab)}: {b}" for lab, ul in labeled for b in bullets(ul)]
                paras = []
            else:
                bs = bullets(inner)
                paras = [text(x) for x in re.findall(r"<p[^>]*>(.*?)</p>", inner, re.S)]
            groups.append({"label": text(gt.group(1)) if gt else None,
                           "bullets": bs, "paragraphs": [x for x in paras if x]})
        groups = [g for g in groups if g["bullets"] or g["paragraphs"]]
        if groups:
            sec["groups"] = groups

        if not heroes and not groups:
            desc = re.search(r'PatchNotes-sectionDescription">(.*?)</div>', content, re.S)
            if desc:
                paras = [text(x) for x in re.findall(r"<p[^>]*>(.*?)</p>", desc.group(1), re.S)]
                paras = [x for x in paras if x]
                if paras:
                    sec["paragraphs"] = paras
            b = bullets(content)
            if b:
                sec["bullets"] = b
        sections.append(sec)
    return sections


def q(s: str) -> str:
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'") + "'"


def emit(sections: list[dict], version: str, patch_date: str, title: str, highlight: str | None) -> str:
    meta = hero_meta()
    out = ["  {", f"    version: {q(version)},", f"    patchDate: {q(patch_date)},", f"    title: {q(title)},"]
    if highlight:
        out.append(f"    highlight: {q(highlight)},")
    out.append("    sections: [")

    def section(t: str, body: dict, pad: str = "      "):
        res = [f"{pad}{{", f"{pad}  title: {q(t)},"]
        if body.get("paragraphs"):
            res.append(f"{pad}  paragraphs: [")
            res += [f"{pad}    {q(p)}," for p in body["paragraphs"]]
            res.append(f"{pad}  ],")
        if body.get("bullets"):
            res.append(f"{pad}  bullets: [")
            res += [f"{pad}    {q(b)}," for b in body["bullets"]]
            res.append(f"{pad}  ],")
        if body.get("heroes"):
            res.append(f"{pad}  heroes: [")
            for h in body["heroes"]:
                m = meta.get(h["hero"])
                if not m:
                    print(f"  !! 영웅 메타 없음: {h['hero']}", file=sys.stderr)
                    m = {"role": "damage", "portrait": ""}
                res += [f"{pad}    {{", f"{pad}      hero: {q(h['hero'])},", f"{pad}      role: '{m['role']}',"]
                if m["portrait"]:
                    res.append(f"{pad}      portraitUrl: {q(m['portrait'])},")
                if h.get("description"):
                    res.append(f"{pad}      description: {q(h['description'])},")
                res.append(f"{pad}      changes: [")
                for c in h["changes"]:
                    res.append(f"{pad}        {{")
                    if c.get("ability"):
                        res.append(f"{pad}          ability: {q(c['ability'])},")
                    res.append(f"{pad}          bullets: [")
                    res += [f"{pad}            {q(b)}," for b in c["bullets"]]
                    res += [f"{pad}          ],", f"{pad}        }},"]
                res += [f"{pad}      ],", f"{pad}    }},"]
            res.append(f"{pad}  ],")
        res.append(f"{pad}}},")
        return res

    # '영웅 업데이트' / '스타디움 업데이트'처럼 내용 없이 제목만 있는 섹션은 뒤따르는 섹션들의
    # 묶음 제목 구실을 한다. 그대로 버리면 '돌격 영웅'이 두 번 나와 어느 쪽이 스타디움인지 알 수 없다.
    parent = None
    for sec in sections:
        if not (sec.get("heroes") or sec.get("bullets") or sec.get("paragraphs") or sec.get("groups")):
            parent = sec["title"]
            continue
        # 묶음 제목은 역할별로 쪼개진 영웅 섹션(돌격/공격/지원)에만 붙인다. 자체 소제목(groups)을
        # 가진 섹션은 그 자체가 top-level이므로 묶음에서 빠져나온 것으로 본다.
        if sec.get("groups"):
            parent = None
        elif parent and not sec["title"].startswith(parent):
            sec = {**sec, "title": f"{parent} - {sec['title']}"}
        if sec.get("groups"):
            for g in sec["groups"]:
                if not g.get("label"):
                    t = sec["title"]
                elif "시즌" in sec["title"]:
                    t = g["label"]
                else:
                    t = f"{sec['title']} - {g['label']}"
                body = {"paragraphs": g["paragraphs"]} if g["paragraphs"] and not g["bullets"] else {"bullets": g["bullets"]}
                out += section(t, body)
            continue
        if sec.get("heroes") or sec.get("bullets") or sec.get("paragraphs"):
            out += section(sec["title"], sec)
    out += ["    ],", "  },"]
    return "\n".join(out)


def main() -> int:
    notes = list_notes()
    if len(sys.argv) < 2:
        print("최근 패치 노트:", file=sys.stderr)
        for n in notes[:10]:
            print(f"  {n['newsNo']:>5}  {n['title']}  ({n['slug']})", file=sys.stderr)
        print("\n사용법: python3 scripts/fetch-patch-note.py <newsNo>", file=sys.stderr)
        return 0

    news_no = sys.argv[1]
    note = next((n for n in notes if str(n["newsNo"]) == str(news_no)), None)
    if not note:
        print(f"목록에서 newsNo {news_no}를 찾지 못했습니다.", file=sys.stderr)
        return 1

    pool = payload(fetch(DETAIL_URL.format(news_no=note["newsNo"], slug=note["slug"])))
    body = max((s for s in pool if isinstance(s, str)), key=len)
    sections = parse_sections(body)

    # 제목의 날짜를 version/patchDate로 쓴다(넥슨 표기 기준).
    m = re.search(r"(\d{4})년 (\d{1,2})월 (\d{1,2})일", note["title"])
    version = f"{m.group(1)}-{int(m.group(2)):02d}-{int(m.group(3)):02d}" if m else "YYYY-MM-DD"
    patch_date = f"{m.group(1)}년 {int(m.group(2))}월 {int(m.group(3))}일" if m else "?"

    # 첫 섹션이 '핫픽스 업데이트입니다...'처럼 패치 성격을 알리는 안내문 한 줄이면 highlight로
    # 끌어올린다. 이벤트 소개 문단도 같은 모양이라(섹션 하나 + 문단 하나) 문구까지 확인해야 한다.
    # 안 그러면 '군림 이벤트가 ...' 같은 섹션이 통째로 highlight로 빨려 들어가 제목이 사라진다.
    NOTICE_HINTS = ("업데이트입니다", "패치입니다", "리플레이 코드")
    highlight = None
    first = sections[0] if sections else None
    if (first and not first.get("heroes") and not first.get("groups")
            and not first.get("bullets") and len(first.get("paragraphs", [])) == 1
            and any(h in first["paragraphs"][0] for h in NOTICE_HINTS)):
        highlight = first["paragraphs"][0]
        sections = sections[1:]

    print(emit(sections, version, patch_date, note["title"].replace("–", "-"), highlight))
    print(f"\n위 내용을 patchNotes.ts의 PATCH_NOTES 배열 맨 앞(또는 날짜 순서에 맞는 위치)에 붙여넣으세요.",
          file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
