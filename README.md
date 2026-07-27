# WatchMeta

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)

> 오버워치 유저를 위한 **전적 분석 & 실시간 영웅 메타(티어표)** 를 제공하는 모바일 최적화 웹 서비스

인게임에서는 영웅별 세부 스탯 변화나 현재 시즌의 1티어 영웅을 한눈에 파악하기 어렵습니다. 매번 패치 노트를 찾아보거나 커뮤니티를 뒤지는 대신, WatchMeta는 내 전적을 수치화해 보여주고 최신 패치·픽률·승률 통계를 기반으로 역할군(탱/딜/힐)별 영웅 티어표를 직관적인 UI로 제공합니다.

설치 없이 웹으로 바로 접속할 수 있으면서도 모바일 앱 수준의 깔끔한 UI, 그리고 '메타 티어표'를 전면에 내세운 픽 선택 가이드가 Overbuff 같은 기존 전적 검색 사이트와의 차별점입니다.

**타겟 유저**: 오버워치를 즐겨 플레이하며 경쟁전 티어 상승에 관심이 많은 유저

---

## 핵심 기능

| 기능 | 설명 | 상태 |
| --- | --- | --- |
| 전적 검색 | 배틀태그로 검색해 승률·KDA·모스트 영웅 등 기본 스탯 뷰 제공 | 🟡 UI 구현 (Mock Data) |
| 역할군별 영웅 티어표 | 탱/딜/힐 역할군별 S~D 티어, 픽률·승률 기반 랭킹 | 🟡 UI 구현 (Mock Data) |
| 최근 전적 | 최근 매치의 승/패, 맵, 플레이 영웅 목록 | 🟡 UI 구현 (Mock Data) |
| 최근 검색 기록 | 검색한 배틀태그를 로컬에 저장, 재검색·삭제 지원 | 🟢 구현 완료 |
| 패치 노트 요약 | 최신 패치 내용 요약 제공 | ⚪️ Post-MVP |

**MVP 범위**: ① 전적 검색 및 기본 스탯 뷰 ② 영웅 티어표 화면

---

## 기술 스택

| 영역 | 기술 |
| --- | --- |
| Frontend | React 19, TypeScript, Vite 8 |
| 스타일링 | Tailwind CSS v4 (`@tailwindcss/vite`) |
| 라우팅 | React Router v7 |
| 서버 상태 | TanStack Query |
| 클라이언트 상태 | Zustand (`persist` 미들웨어) |
| HTTP 클라이언트 | Axios |
| 아이콘 | lucide-react |
| 배포 | Vercel |
| Backend | 예정 |

---

## 프로젝트 구조

모노레포로 관리하며, 현재는 프론트엔드만 구현되어 있습니다.

```
WatchMeta/
├── frontend/                  # React + Vite 모바일 웹 프론트엔드
│   └── src/
│       ├── app/                # 라우터, 전역 Provider
│       ├── pages/               # 라우트 단위 화면 (Home, Search, Profile, TierList ...)
│       ├── features/            # 도메인별 로직 (player-search, player-profile, tier-list)
│       ├── components/          # 공통 레이아웃 · 피드백 컴포넌트
│       ├── store/               # Zustand 스토어
│       ├── lib/                 # API 클라이언트
│       └── types/                # 공용 타입 정의
└── backend/                    # 백엔드 (예정)
```

---

## 시작하기

```bash
git clone https://github.com/kangjooy0ung/WatchMeta.git
cd WatchMeta/frontend
npm install
npm run dev
```

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 로컬 개발 서버 실행 |
| `npm run build` | 타입체크 후 프로덕션 빌드 (`tsc -b && vite build`) |
| `npm run preview` | 빌드 결과 로컬 미리보기 |
| `npm run lint` | oxlint 린트 검사 |

---

## 배포

Vercel을 통해 배포합니다. 모노레포 구조이므로 프로젝트 설정 시 **Root Directory를 `frontend`로 지정**해야 합니다.

---

## 로드맵 (6주 계획)

| 주차 | 목표 | 상태 |
| --- | --- | --- |
| 3주 | 오버워치 API 리서치 및 화면 흐름 기획 | ✅ 완료 |
| 4주 | 전적 검색 및 시각화 뷰 구현 | ✅ 완료 (Mock Data) |
| 5주 | 영웅 티어표 화면 및 데이터 연동 | 🟡 진행 중 (화면 완료, 데이터 연동 예정) |
| 6주 | QA 테스트 및 Vercel을 통한 최종 MVP 배포 | ⚪️ 예정 |

---

## 수익 모델

기본 기능은 무료로 제공해 유저를 확보하고, 구글 애드센스와 같은 웹 배너 광고를 통해 유지보수 비용 및 수익을 창출합니다.

---

## 팀

이전 프로젝트를 진행하며 모바일 UI를 웹과 앱 양쪽으로 구현해본 경험과 API 연동 경험이 있습니다. 평소 여가 시간에는 오버워치를 즐겨 플레이하며 유저들의 니즈를 잘 파악하고 있습니다.
