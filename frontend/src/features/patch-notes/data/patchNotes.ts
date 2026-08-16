import type { PatchNote } from '../../../types/patchNote';

// 출처: https://overwatch.blizzard.com/ko-kr/news/patch-notes/ (2026-08-16 확인)
// 2026-08-14 패치는 확인 시점에 한국어 번역이 게시되지 않아 영문 원문을 직접 번역해 반영함
export const PATCH_NOTES_SOURCE_URL = 'https://overwatch.blizzard.com/ko-kr/news/patch-notes/';

export const PATCH_NOTES: PatchNote[] = [
  {
    version: '2026-08-14',
    patchDate: '2026년 8월 14일',
    title: '오버워치 2 패치 노트 - 2026년 8월 14일',
    highlight: '핫픽스 업데이트입니다. 8월 11일 패치부터 생성된 리플레이 코드는 계속 이용할 수 있습니다.',
    sections: [
      {
        title: '영웅 업데이트',
        heroes: [
          {
            hero: 'D.Mon',
            role: 'tank',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/a46c60b8562fdbd0b8308396d0808f7606fba208bc67cccf3f82fe56d2c73b9d.png',
            changes: [
              {
                bullets: [
                  '휴대용 융합 연발총 사용 시 일부 타격 판정이 되지 않던 문제를 수정했습니다.',
                  '한계 돌파가 적중한 대상에게 초과 생명력을 올바르게 부여하지 않던 문제를 수정했습니다.',
                  '이전 업데이트에서 수정됨 - 한계 돌파 발동 시 초과 생명력이 적용되지 않던 문제를 해결했습니다.',
                  '콘솔 플랫폼에서 추진기 전환이 작동하지 않던 문제를 수정했습니다.',
                ],
              },
              {
                ability: '히트박스 변경',
                bullets: [
                  '파워 배리어 전개 중 정면에서 피해를 입던 문제를 수정했습니다.',
                  '메카 머리 히트박스 높이를 모델에 더 밀착하도록 조정했습니다.',
                ],
              },
              {
                ability: 'Surging Strike',
                bullets: [
                  '시전 시간이 0.15초에서 0.05초로 감소했습니다.',
                  '회복 시간이 0.25초에서 0.15초로 감소했습니다.',
                ],
              },
              {
                ability: '융합 연발총',
                bullets: [
                  '시전 시간이 0.3초에서 0.2초로 감소했습니다.',
                  '회복 시간이 0.5초에서 0.2초로 감소했습니다.',
                ],
              },
            ],
          },
          {
            hero: '제트팩 캣',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/03a184cd0de27091e0099ac22635ad9615a8f6997881a5c25cc5f2444764f729.png',
            changes: [
              {
                bullets: [
                  '기본 이동 속도가 초당 6미터에서 5.5미터로 감소했습니다.',
                ],
              },
              {
                ability: '골골대기',
                bullets: [
                  '자가 치유 감소 페널티가 25%에서 40%로 증가했습니다.',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    version: '2026-08-12',
    patchDate: '2026년 8월 12일',
    title: '오버워치 2 패치 노트 - 2026년 8월 13일',
    highlight: '핫픽스 업데이트입니다. 8월 12일부터 생성된 리플레이 코드는 계속 이용할 수 있습니다.',
    sections: [
      {
        title: '영웅 업데이트',
        heroes: [
          {
            hero: 'D.Mon',
            role: 'tank',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/a46c60b8562fdbd0b8308396d0808f7606fba208bc67cccf3f82fe56d2c73b9d.png',
            changes: [
              {
                ability: '플라스마 세이버',
                bullets: [
                  '피해가 60에서 65로 증가했습니다.',
                ],
              },
              {
                ability: '추진기',
                bullets: [
                  '연료 소모율이 40에서 25로 감소했습니다.',
                  '연료 재생률이 15에서 22.5로 증가했습니다.',
                ],
              },
              {
                ability: '융합 연발총',
                bullets: [
                  '피해가 15에서 16으로 증가했습니다.',
                  '재사용 대기시간이 6초에서 4초로 감소했습니다.',
                ],
              },
            ],
          },
        ],
      },
      {
        title: '버그 수정',
        bullets: [
          '모이라가 소멸을 사용했을 때 나노 강화제가 제거되던 문제를 수정했습니다.',
          '융합 연발총이 활성화된 동안 D.Mon이 파워 배리어를 전개할 경우, 파워 배리어가 D.Mon을 온전히 보호하지 못하던 문제를 수정했습니다.',
          '파라이수에서 두 번째 공격팀 생성 지점이 플레이 가능 지역까지 확장되던 문제를 수정했습니다.',
          'D.Mon이 일시적으로 무적이 될 수 있었던 문제를 수정했습니다.',
        ],
      },
    ],
  },
  {
    version: '2026-08-11',
    patchDate: '2026년 8월 11일',
    title: '오버워치 2 패치 노트 - 2026년 8월 12일',
    sections: [
      {
        title: '탈론의 지배 - 4시즌: 부산의 영웅',
        paragraphs: [
          '쓰레기 집단과 탈론이 부산을 급습하자, 신규 돌격 영웅 D.Mon이 D.Va와 다른 MEKA 부대원들과 함께 고향을 지키러 나섭니다! 슈팅 스타: 마이 MEKA 마니아 이벤트에서 좋아하는 조종사를 선택하고, 응원을 통해 조종사들의 전 세계 순위를 올리면서 별을 모으고 부대의 스토리도 알아가세요. 또한 새롭게 개편되어 유연한 진척도 시스템과 전설 보상 교체 옵션을 제공하는 배틀 패스를 끝까지 완료해 보세요. 여기에 새로 단장된 부산, 파라이수, 아이헨발데를 둘러보고, 팀 전원이 함께 진행하면서 개선된 전투 내 피드백으로 모든 플레이어의 기여도를 더 잘 확인할 수 있는 팀 드라이브에 참여해 보세요. 마지막으로 겐지 신화 스킨이나 소전의 신화 무기, 또는 다른 꾸미기 아이템을 잠금 해제하여 컬렉션에 추가하세요!',
        ],
      },
      {
        title: '신규 돌격 영웅: D.Mon',
        paragraphs: [
          '이유나는 그녀의 MEKA, 야수를 타고 몇 년 동안 부산을 지켜왔습니다. 이제 여러분의 차례입니다! 오랜 기다림 끝에 스토리에서 나온 MEKA 조종사가 선두에서 이끄는 신규 돌격 영웅 D.Mon으로 게임에 등장합니다. 플라스마 세이버로 적진을 돌파하고, 파워 배리어를 전략적으로 활용해 팀을 보호하며, 추진기로 빠르게 이동하며, 근거리 압박 대신 융합 연발총의 사거리를 활용해 보세요. 팀 전체가 함께 움직일 때 가장 활약할 수 있는 만큼, D.Mon과 함께 MEKA 부대를 구성하고 서로의 마음속 영웅을 불러내세요!',
        ],
      },
      {
        title: '전장 개편: 파라이수, 아이헨발데, 부산',
        paragraphs: [
          '익숙한 전장 3곳이 업데이트로 재단장되어 새로운 느낌을 줍니다. 부산에는 쓰레기 집단의 습격과 탈론의 MEKA 기지 공격의 상처로 생긴 새로운 공간과 여름 풍경 및 D.Mon의 생활에 관한 추억이 여기저기 남겨져 있습니다. 파라이수는 도미나가 도시를 장악하는 도중에도 축제를 준비 중이며, 한편으론 루시우가 저만의 계획을 세우고 있습니다. 끝으로 아이헨발데에도 고유의 전투 흐름을 유지하기 위한 새로운 경로와 이동의 선택지가 생겼습니다. (부산 - 쟁탈, 아이헨발데 - 혼합, 파라이수 - 혼합 3개 전장이 새단장되었으며, 세부 변경 내역은 공식 페이지에 전후 비교 이미지로만 제공되어 텍스트 목록은 없습니다.)',
        ],
      },
      {
        title: '배틀 패스 개편',
        paragraphs: [
          '더욱 유연하고 플레이어 친화적인 배틀 패스 경험을 위한 업데이트로, 우선적으로 원하는 보상 선택, 배틀 패스 스킨 1종을 시즌별 교체 목록의 엄선된 스킨으로 교환, 그리고 명확하고 보람 있는 진척을 위해 개편된 사용자 인터페이스 등을 만나볼 수 있습니다.',
        ],
        bullets: [
          '나만의 경로를 선택: 더 이상 순서대로 모든 보상을 잠금 해제할 필요가 없습니다. 먼저 얻고 싶은 보상을 선택할 수 있으며, 입문 트랙 완료 후 언제라도 트랙을 바꿀 수 있습니다.',
          '원하는 스킨으로 교환: 배틀 패스 하나당, 배틀 패스 스킨 하나를 시즌별 교체 목록의 엄선된 스킨으로 교환할 수 있습니다.',
          '현대화된 배틀 패스 경험: 사용자 지정 테마와 외관으로 새롭게 개편한 사용자 인터페이스로 배틀 패스 진척이 최신화되었습니다.',
          '늘어난 유연성, 시즌별 가치는 그대로: 보상을 얻는 핵심 과정은 유지하면서도 진행 방법과 우선순위 선정에 더 많은 선택을 제공합니다.',
        ],
      },
      {
        title: '슈팅 스타: 마이 MEKA 마니아',
        bullets: [
          '오랫동안 대한민국과 부산의 자랑이었던 MEKA 부대의 스타들이 이제 더 넓은 무대로 나아갑니다.',
          '응원할 MEKA 부대원을 선택하세요! 테마 꾸미기 아이템, 전리품 상자 이외 다수를 포함하는 보상 패스를 획득하세요.',
          'MEKA 조종사의 보상 패스를 완료하면 글로벌 순위표에서 해당 조종사에게 투표가 이루어집니다. 이벤트 종료 시, 가장 많은 표를 얻은 조종사가 그려진 특별한 프로필 카드가 잠금 해제되어 참여한 모든 플레이어에게 지급됩니다.',
          'MEKA 부대 조종사 5명 모두의 보상 패스를 완료하고 6번째 보너스 보상 패스를 잠금 해제하세요.',
          '8월 12일부터 9월 1일까지 슈팅 스타: 마이 MEKA 마니아에 참여할 수 있습니다.',
        ],
      },
      {
        title: '월드컵 응원 대회',
        bullets: [
          '9월 2일부터 9월 15일까지 경기를 플레이하고 도전 과제를 완료해 응원을 획득하세요.',
          'AMER, ASIA, EMEA 중 좋아하는 컨퍼런스를 응원할 수 있으며, 컨퍼런스마다 전리품 상자·배틀 패스 경험치·꾸미기 아이템 등의 보상을 제공합니다.',
          '이벤트 종료 시 가장 많은 응원을 받은 컨퍼런스가 전 세계 승자로 선택되며, 참여한 모두에게 승리한 컨퍼런스의 테마 무기 장식품이 잠금 해제됩니다.',
        ],
      },
      {
        title: '일반 업데이트',
        bullets: [
          '전투 내 피드백 개선: 실시간 처치 정보 위에 아군·적군 생존 인원을 보여주는 팀 상태 표시등이 추가되었고, 아군을 대량의 피해로부터 지켜냈을 때를 추적하는 신규 통계 \'보호\'가 추가되었으며, 기존 \'구원\' 통계가 더 많은 상황을 포함하도록 확장되었습니다. 치유·상태 효과·치명타 피해의 HUD 시각 효과가 개선되었고, 연속 처치 달성 시 축하 음성/알림이 추가되었으며, 처치 기여도를 보여주는 준 피해 비율 표시가 복귀했습니다.',
          '핑 시스템 리팩터: 대규모 기술적 개선으로 평균 약 1.5배, 일부 상황에서는 최대 30배까지 효율이 증가했고 메모리 사용량도 크게 줄었습니다.',
          '일일 도전 과제 \'연전연승\'의 요구 처치 수가 10회에서 5회로 감소했습니다.',
          '영상 플레이어(스토리 뷰어 포함)에서 마우스로 임의 지점 이동, 컨트롤러/키보드로 앞뒤 10초 건너뛰기가 가능해졌고, 시청 진행 상황을 기억하도록 개선되었습니다.',
        ],
      },
      {
        title: '경쟁전 업데이트',
        bullets: [
          '신규 실력 등급 - 에메랄드: 플래티넘과 다이아몬드 사이에 새로운 등급 에메랄드가 추가되었습니다. 플레이어 대부분이 몰려 있는 골드~플래티넘 구간 근처에 등급을 세분화해 더 명확한 등급 정체성과 목표를 제공하고, 실력을 더 정확히 가늠할 수 있도록 했습니다. 에메랄드 전용 플레이어 칭호와 무기 장식품도 함께 추가되었습니다.',
          '이번 등급 재분배는 플래티넘·다이아몬드에 위치한 플레이어를 에메랄드로 옮기는 데 중점을 두며, 동시에 챔피언 최상위 구간은 더욱 희소해집니다.',
          '등급 분배 표시기: 같은 대기열의 다른 플레이어와 비교해 내 등급 위치를 보여주는 신규 UI가 경쟁전 개요에 추가되었습니다.',
          '팀 드라이브(실험 단계): 팀으로 경기에 승리하면 승리한 플레이어들과 자동으로 그룹이 편성되어 연승 시 추가 보너스를 받는 기간 한정 이벤트입니다. 첫 팀 드라이브는 9월 5일 오전 3시부터 9월 8일 오전 3시까지 진행됩니다.',
          '챌린저 점수 조정 (상승분): 그랜드마스터2 175→200, 그랜드마스터1 200→250, 챔피언5 250→350, 챔피언4 300→450, 챔피언3 400→550, 챔피언2 550→700, 챔피언1 700→900.',
        ],
      },
      {
        title: '영웅 업데이트 - 돌격',
        heroes: [
          {
            hero: '도미나',
            role: 'tank',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/1161c112292c56c052c0ae711792fcde06e3251b98bc9709e582dd7585b5dcd6.png',
            changes: [
              {
                ability: '판옵티콘',
                bullets: [
                  '방벽 내구도가 450에서 500으로 증가했습니다.',
                ],
              },
            ],
            description: '판옵티콘 방벽의 내구도가 늘어나 안정성이 개선되었습니다. 유효 생명력이 높아져 적이 벗어나기가 더 어려워졌으며, 이로써 폭발할 가능성이 증가하거나 궁극기 대처에 더 많은 시간을 소모하도록 만들었습니다.',
          },
          {
            hero: '둠피스트',
            role: 'tank',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/ff5c54f43ad253c7faeda9c4ed31d42582ea6b19205d197866f3dd0c0aa14c16.png',
            changes: [
              {
                ability: '지진 강타',
                bullets: [
                  '피해가 50에서 60으로 증가했습니다.',
                ],
              },
            ],
            description: '지진 강타의 공격력을 올려서 둠피스트가 다른 기술을 연계하기 전 더욱 효과적으로 대상을 약화시킬 수 있도록 했습니다.',
          },
          {
            hero: '해저드',
            role: 'tank',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/ca48b96dbae6ea7f58ce8a5e73513c8c62b1685bdbf258020fb78bb21a008b5f.png',
            changes: [
              {
                bullets: [
                  '궁극기 비용이 7% 증가했습니다.',
                ],
              },
              {
                ability: '폭발성 꿰뚫기 - 주요 특전',
                bullets: [
                  '필요한 본스퍼 적중 횟수가 14에서 12로 감소했습니다.',
                ],
              },
            ],
          },
          {
            hero: '마우가',
            role: 'tank',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/937cbae13f50502b4191c09b7c178ef60d2eadddcdda5bc4268c1541216b8722.png',
            changes: [
              {
                ability: '전투 연료 - 주요 특전',
                bullets: [
                  '발당 얻는 추가 생명력이 3에서 4로 증가했습니다.',
                ],
              },
              {
                ability: '돌파',
                bullets: [
                  '재사용 대기시간이 5초에서 6초로 증가했습니다. (5대5)',
                ],
              },
            ],
            description: '돌파의 재사용 대기시간을 증가시켜 마우가가 물러나기 전 교전에 참여해야 하는 시간을 늘렸습니다. 이로써 교전 개시 능력에 직접적 영향을 주지 않으면서 기동성을 감소시켰습니다.',
          },
          {
            hero: '오리사',
            role: 'tank',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/a73958a28551f5254f3ab3f97c5f5f8d698a95c0b6a515d1a2b1caac169205a6.png',
            changes: [
              {
                ability: '충전 투창 - 주요 특전',
                bullets: [
                  '제거되었습니다.',
                ],
              },
              {
                ability: '묵직한 투창 - 주요 특전',
                bullets: [
                  '신규: 투창의 밀쳐내는 효과가 25% 증가하고 벽 충돌 피해가 15 증가합니다.',
                ],
              },
            ],
          },
          {
            hero: '윈스턴',
            role: 'tank',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/46a10db3aa908c590ddc4e7606376a88143d1f1306ecfbea043263040f9529a5.png',
            changes: [
              {
                bullets: [
                  '궁극기 비용이 6% 감소했습니다.',
                ],
              },
              {
                ability: '활력 충전 방벽 - 주요 특전',
                bullets: [
                  '치유량이 30에서 35로 증가했습니다.',
                ],
              },
            ],
          },
        ],
      },
      {
        title: '영웅 업데이트 - 공격',
        heroes: [
          {
            hero: '캐서디',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/5a0a0840565c5810d9a638d391b0403ba743459d52aa9f1c443a9fc87e41f06f.png',
            changes: [
              {
                ability: '공평한 승부 - 보조 특전',
                bullets: [
                  '제거되었습니다.',
                ],
              },
              {
                ability: '이랴! - 보조 특전',
                bullets: [
                  '신규: 구르기 사용 후, 캐서디가 1.5초에 걸쳐 사라지는 60%의 이동 속도 증가 효과를 얻습니다.',
                ],
              },
            ],
          },
          {
            hero: '에코',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/d4f2d5b0c2b7e82d61353186c5f23152ccba9d3569b50839aa580dca3e9114ba.png',
            changes: [
              {
                ability: '공중 탄약 - 보조 특전',
                bullets: [
                  '신규: 비행 중 에코의 탄약이 무한합니다.',
                ],
              },
              {
                ability: '상향등 - 주요 특전',
                bullets: [
                  '제거되었습니다.',
                ],
              },
              {
                ability: '집중 돌진 - 주요 특전',
                bullets: [
                  '보조 특전에서 주요 특전으로 변경되었습니다.',
                  '광선 집중의 사거리가 8미터 증가하고 활성화 시 이동 속도가 25% 증가합니다.',
                  '거리가 6미터에서 8미터로 증가했습니다.',
                  '이동 속도가 15%에서 25%로 증가했습니다.',
                ],
              },
            ],
          },
          {
            hero: '엠레',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/c51e2f698138861c0e3b6cfab3c3ca9d67fd709be175e7c397aa6f2649712a30.png',
            changes: [
              {
                bullets: [
                  '궁극기 비용이 6% 감소했습니다.',
                ],
              },
              {
                ability: '제압 보장 - 보조 특전',
                bullets: [
                  '감속 지속 시간이 1초에서 1.5초로 증가했습니다.',
                ],
              },
            ],
          },
          {
            hero: '겐지',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/156b12c20b1aea872c1eeb5bb37a7de1047b2ab30ecefd0663a8925badde1ea8.png',
            changes: [
              {
                bullets: [
                  '궁극기 비용이 6% 감소했습니다.',
                ],
              },
            ],
          },
          {
            hero: '파라',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/60ac2d5de4a6d34644d8872233da402f1436c87f804bb11a21661bb30bf4a51f.png',
            changes: [
              {
                ability: '충격탄',
                bullets: [
                  '재사용 대기시간이 7초에서 8초로 증가했습니다.',
                ],
              },
            ],
            description: '충격탄은 파라에게 기동성과 위치 변경 능력을 동시에 제공합니다. 재사용 대기시간을 증가시켜 다른 곳으로 이동하거나 적의 움직임을 방해할 수 있는 빈도를 줄였습니다.',
          },
          {
            hero: '시온',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/ad0931805f9f28f03e8d55fead38ed85ee52f5c75f89aa3deec8a27fdc4fd6b3.png',
            changes: [
              {
                ability: '조이라이드',
                bullets: [
                  '지상 발사 감지 반경이 1.5미터에서 1미터로 감소했습니다.',
                ],
              },
            ],
            description: '이 변경으로 바이크의 크기와 충돌 반경이 더 잘 맞게 되어, 플레이어는 더욱 정확하게 지상 발사를 하거나 공중 발사를 활용해야 합니다.',
          },
          {
            hero: '트레이서',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/4504f6f15cb3feaa92ecd38e01dcf751cb5abdac2e0bb52d0555727e53277502.png',
            changes: [
              {
                ability: '시간 질주 - 보조 특전',
                bullets: [
                  '제거되었습니다.',
                ],
              },
              {
                ability: '시간적 재생 - 보조 특전',
                bullets: [
                  '신규: 생명력 지속 재생이 50% 빠르게 발동합니다.',
                ],
              },
              {
                ability: '시간 역행',
                bullets: [
                  '재사용 대기시간이 13초에서 12초로 감소했습니다.',
                ],
              },
            ],
            description: '최근 조정으로 트레이서의 공격력은 효과적인 수준까지 도달했으며, 시간 역행의 재사용 대기시간이 줄어들어 더 자주 교전에서 벗어날 수 있을 것입니다.',
          },
          {
            hero: '벤데타',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/cf8ffb52b6f315546d5e94e9d6defad5a2c570798776956de23f47536f9529da.png',
            changes: [
              {
                ability: '치솟는 베기',
                bullets: [
                  '생성 후 재사용 대기시간이 7초에서 3초로 감소했습니다.',
                ],
              },
            ],
            description: '부활 이후 치솟는 베기의 재사용 대기시간을 감소시켜 부활 이후 대기 시간을 줄이는 동시에 제한적인 빠른 전투 복귀 능력을 유지했습니다.',
          },
          {
            hero: '벤처',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/dcab9123f5f55df22e54d4e797de43c71b917e0149dd059a7fd6136f48464cd0.png',
            changes: [
              {
                bullets: [
                  '궁극기 비용이 8% 감소했습니다.',
                ],
              },
              {
                ability: '심층 잠복 - 보조 특전',
                bullets: [
                  '드릴 돌진 거리가 50%에서 75%로 증가했습니다.',
                ],
              },
              {
                ability: '먼지투성이 - 주요 특전',
                bullets: [
                  '총 보호막 획득량이 30에서 40으로 증가했습니다.',
                ],
              },
            ],
          },
        ],
      },
      {
        title: '영웅 업데이트 - 지원',
        heroes: [
          {
            hero: '제트팩 캣',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/03a184cd0de27091e0099ac22635ad9615a8f6997881a5c25cc5f2444764f729.png',
            changes: [
              {
                bullets: [
                  '궁극기 비용이 7% 증가했습니다.',
                  '기본 이동 속도가 초당 5.5미터에서 6미터로 증가했습니다.',
                  '공중 가속이 7.7에서 9.5로 증가했습니다.',
                ],
              },
              {
                ability: '박치기 - 주요 특전',
                bullets: [
                  '제거되었습니다.',
                ],
              },
              {
                ability: '냥벽한 골골대기 - 주요 특전',
                bullets: [
                  '신규: 골골대기의 각 파동이 세 번 물결칩니다.',
                ],
              },
              {
                ability: '생명줄',
                bullets: [
                  '이동 속도 보너스가 40%에서 30%로 감소했습니다.',
                ],
              },
            ],
            description: '이러한 변경으로 제트팩 캣의 이동 반응성을 향상하는 동시에 생명줄 이동 속도를 이전과 비슷하게 유지하려 합니다. 정신 없는 비행의 이동 속도는 이전과 동일합니다.',
          },
          {
            hero: '주노',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/c0167d251e57b0aa2b1e16c37d87f0e7c77263db9dd0503d77b5f2589bf3e4a0.png',
            changes: [
              {
                ability: '펄사 어뢰',
                bullets: [
                  '대상 고정 최소 시간이 0.5초에서 0.35초로 감소했습니다.',
                ],
              },
            ],
            description: '이는 가까운 대상의 최소 고정 시간을 줄여서 펄사 어뢰를 더욱 반응적으로 사용할 수 있게 하는 동시에 거리에 따라 펄사 어뢰의 고정 시간에 명확한 차이를 두려는 변경입니다.',
          },
          {
            hero: '라이프위버',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/3376515cebed0904012e67e956f6d1b9c12e03da642845eeaf787b7e4c7b339d.png',
            changes: [
              {
                ability: '구원의 손길',
                bullets: [
                  '이제 0.6초 후 점프 입력으로 직접 취소할 수 있습니다.',
                  '기본 끌어오기 속도가 초당 30미터에서 25미터로 감소했습니다.',
                  '15미터 이상의 거리에서 끌어오는 대상은 더 천천히 움직이며 점점 빨라집니다.',
                  '구원의 손길 취소 조작에 대한 새로운 일반 영웅 설정을 추가했습니다.',
                ],
              },
            ],
            description: '이러한 변경은 구원의 손길로 끌린 플레이어가 라이프위버의 위치로 끝까지 이동할지 말지 더 넓은 선택권을 부여합니다. 이제 점점 천천히 당겨지게 되어, 원하면 이동을 취소할 수 있는 시간이 늘어납니다.',
          },
          {
            hero: '미즈키',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/a9733c2367e0cbd70b9316fd2e1e17028653ec56d0051ea6ff098531dc4f99fc.png',
            changes: [
              {
                ability: '잰걸음 - 주요 특전',
                bullets: [
                  '증가하는 이동 속도가 25%에서 20%로 감소했습니다.',
                ],
              },
              {
                ability: '속박 사슬',
                bullets: [
                  '투사체 크기가 0.35에서 0.3으로 감소했습니다.',
                ],
              },
              {
                ability: '종이 인형 분신술',
                bullets: [
                  '재사용 대기시간이 11초에서 12초로 증가했습니다.',
                ],
              },
            ],
            description: '최근 적용된 종이 인형 분신술의 지속 시간과 재사용 대기시간 변경으로 인해 미즈키의 기동성 활성 시간은 크게 증가했습니다. 전체적인 활성 시간을 줄이기 위해 재사용 대기시간 일부를 되돌리고, 속박 사슬의 투사체 크기를 줄여 더 정확한 조준이 필요하도록 했습니다.',
          },
          {
            hero: '우양',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/4959500b495b35c0908be2abda56b53f2601b2c5cc39a1cfde8df1bffd38d66d.png',
            changes: [
              {
                ability: '수호의 파도',
                bullets: [
                  '최대 각도가 10도에서 15도로 증가했습니다.',
                ],
              },
            ],
            description: '수호의 파도 너비를 늘려 기술로 더 쉽게 다수의 아군 및 적에게 영향을 줄 수 있도록 했습니다.',
          },
          {
            hero: '젠야타',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/7d1546b1541a8afc39353f9337a408d6275a141b0432b7e560ef61579996b0fc.png',
            changes: [
              {
                ability: '부조화의 수리 - 보조 특전',
                bullets: [
                  '생명력 흡수량이 10%에서 15%로 증가했습니다.',
                ],
              },
            ],
          },
        ],
      },
      {
        title: '스타디움 업데이트',
        paragraphs: [
          '스타디움 모드의 다수 영웅 파워·아이템이 조정되었습니다. 주요 변경: D.Va(정면 돌격·집중 융합·토끼 강타 등 파워 개편, D.Mon의 폭탄 로봇 아이템이 로봇 볼링으로 개편), 오리사(치명적인 돌진가 치명타 강화, OR-15 강화기 개편), 자리야(방폭 부츠 비용 3,750→9,000 대폭 증가), 라마트라(원한의 소용돌이·만족을 모르는 나선 피해 감소), 애쉬(B.O.B. 주니어 궁극기 비용 감소 강화), 정크랫(빙고 아이템 신규 추가), 트레이서(충동적 파워로 펄스 폭탄 시간 역행 콤보 견제), 아나·제트팩 캣·키리코·우양 등 지원 영웅 다수의 파워·아이템이 조정되었습니다. (아이템 단위의 세부 수치는 공식 페이지 참고)',
        ],
      },
      {
        title: '버그 수정 - 일반',
        bullets: [
          '브리기테의 격려 타격 특전이 의도대로 즉시 치유 효과를 제공하지 않던 문제를 수정했습니다.',
          '미즈키의 종이 인형 분신술 복귀 위치가 화물과 너무 가까울 때 발동하지 않던 문제를 수정했습니다.',
          '사용자 지정 게임 설정에서 켜고 끌 수 있는 옵션에 처형이 나타나지 않던 문제를 수정했습니다.',
          "\"널 위한 선물이야\" 도전 과제가 의도와는 다르게 완료가 어렵던 문제를 수정했습니다.",
          '리퍼가 긴박한 방아쇠를 발사하는 중 재장전 예약이 되지 않던 문제를 수정했습니다.',
          '생존왕 하위 역할의 지속 치유가 해당하는 이동 기술 없이 잘못 발동되던 문제를 수정했습니다.',
          '둠피스트의 적자생존 특전이 올바른 최대 추가 생명력을 제공하지 않던 문제를 수정했습니다.',
          '컨트롤러 사용 중 한조의 냉기 화살 특전을 활성화할 시 발생하던 문제를 수정했습니다.',
        ],
      },
      {
        title: '버그 수정 - 스타디움',
        bullets: [
          '이전 업데이트에서 소용돌이 약병이 올바른 생명력을 제공하지 않던 문제를 수정했습니다.',
          '이전 업데이트에서 3연속 토미건 발사가 D.Va에게 제대로 작동되지 않던 문제를 수정했습니다.',
          '이전 업데이트에서 아군 균열과 소행성 강타를 같이 사용할 때 피해 감소가 없던 문제를 수정했습니다.',
          '이전 업데이트에서 루시우의 나노 뿝 아이템과 잔향을 함께 사용할 때 의도보다 더 큰 피해를 주던 문제를 수정했습니다.',
          'D.Va가 MEKA 펀치를 사용할 때 방벽이나 배치 가능 물체를 파괴해 부스터 재사용 대기시간을 초기화하던 문제를 수정했습니다.',
          '정크랫의 빵야! 파워가 리튬 합금의 불태우기 피해를 덮어씌우던 문제를 수정했습니다.',
          '정크랫의 상쾌한 방사능 아이템이 성공적 은행 강도의 재사용 대기시간 감소를 제거하던 문제를 수정했습니다.',
          '스카이라인 나노머신이 지속 피해와 제대로 작동하지 않던 문제를 수정했습니다.',
        ],
      },
    ],
  },
  {
    version: '2026-07-29',
    patchDate: '2026년 7월 29일',
    title: '오버워치 패치 노트 - 2026년 7월 29일',
    highlight: '버그 수정 업데이트입니다. 리플레이 코드는 모두 제거되었습니다.',
    sections: [
      {
        title: '경쟁전 업데이트',
        bullets: ['이전 업데이트에서, 영웅 금지의 메커니즘과 규칙을 설명하는 신규 탭이 경쟁전 정보 페이지에 추가되었습니다.'],
      },
      {
        title: '버그 수정 - 일반',
        bullets: ['이전에 완료한 이벤트 도전 과제가 때때로 도전 과제 메뉴에 표시되던 문제를 수정했습니다.'],
      },
      {
        title: '영웅',
        heroes: [
          {
            hero: '라이프위버',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/b8984e0197035ae44d3eff1a6de3c1e331ee82fad061102c94843e739668f37f.png',
            changes: [{ ability: '치유의 꽃', bullets: ['무기 변경 시 치유의 꽃이 예기치 않게 시전되던 문제를 수정했습니다.'] }],
          },
          {
            hero: '메르시',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/55e281170eb6d65b2bece475b1179ccf37810dfb46b957705227d566cb38be9e.png',
            changes: [{ bullets: ['메르시가 의무관 하위 역할로 받는 자가 치유량이 증가하던 문제를 수정했습니다.'] }],
          },
        ],
      },
      {
        title: '스타디움',
        bullets: ['D.Va에 관한 3연속 토미건 발사 문제를 수정했습니다.'],
      },
    ],
  },
  {
    version: '2026-07-15',
    patchDate: '2026년 7월 15일',
    title: '오버워치 패치 노트 - 2026년 7월 15일',
    sections: [
      {
        title: '2026 하계 스포츠 대회',
        paragraphs: [
          '2026 하계 스포츠 대회에서 누구나 좋아하는 해변의 난투가 아케이드에 돌아옵니다! 루시우볼을 힘껏 날리고, 루시우볼 리믹스로 분위기를 띄우거나, 윈스턴의 비치 발리볼에서 재미를 나누어 보세요. 도전 과제를 완료하면 뜨거운 여름에 어울리는 전리품을 얻을 수 있습니다. 7월 15일부터 31일까지 진행되는 2026 하계 스포츠 대회에서 햇살 아래 빛나는 승리를 거머쥐세요!',
        ],
      },
      {
        title: '정크랫의 전리품 사냥',
        paragraphs: [
          '8월 1일부터 8월 4일까지 전리품으로 가득한 주말을 위해 정크랫의 전리품 사냥이 돌아옵니다! 매 경기를 플레이할 때마다 전리품 상자에 가까워지며, 도전 과제가 유연하게 조정되므로 한 번에 모든 보상을 노리거나 자신만의 속도로 진행할 수도 있습니다. 진행도는 초기화되지 않으며, 매일 접속할 필요나 말도 안 되는 과제도 없죠... 그저 폭발과 산더미 같은 전리품만 가득합니다!',
        ],
      },
      {
        title: '발굴 입문',
        paragraphs: [
          '발굴 입문은 이번에도 계속되어, 여러분이 이미 하고 계신 활동, 바로 오버워치 플레이에 대해 보상을 지급합니다. 남은 시즌 동안 로그인하고, 도전 과제를 완료하며, 게임에서 승리하고, 매주 꾸준히 플레이하면 전리품 상자를 얻을 수 있습니다. 게임을 많이 플레이할수록 보상으로 가득한 기본, 특급 및 전설 전리품 상자를 획득할 기회가 늘어납니다.',
        ],
      },
      {
        title: '영웅 업데이트 - 돌격',
        heroes: [
          {
            hero: '둠피스트',
            role: 'tank',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/36dc867dd65cff81b5154c34531a9c520059c6f8c907631a6f99e049a6777dbb.png',
            description:
              '강화 로켓 펀치의 증가한 범위 크기가 초기 대상에서 멀리 떨어진 대상까지 타격하고 있었습니다. 플레이하는 쾌감을 유지하기 위해 추가 범위와 반경은 일정 부분 존치하면서 추가되는 크기를 줄였습니다.',
            changes: [
              {
                ability: '로켓 펀치',
                bullets: [
                  '강화된 펀치의 방사형 피해 사거리 증가가 75%에서 40%로 감소했습니다.',
                  '강화된 펀치의 방사형 피해 범위 증가가 50%에서 40%로 감소했습니다.',
                ],
              },
            ],
          },
          {
            hero: '정커퀸',
            role: 'tank',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/a362b9dba4f5f4f704076945f3c72d7d442d536ffcc2fc5735062f4a1cee8031.png',
            description:
              '지휘의 외침은 정커퀸의 본인의 생존과 팀 보호에 활용화는 주요 기술입니다. 재사용 대기시간이 효과가 끝난 후부터 시작되어, 다음 사용까지 시간이 오래 걸렸습니다. 교전 중 더 자주 사용할 수 있도록 재사용 대기시간을 줄였습니다.',
            changes: [
              {
                ability: '지휘의 외침',
                bullets: ['재사용 대기시간이 12초에서 10초로 감소했습니다. (5대5)', '재사용 대기시간이 15초에서 13초로 감소했습니다. (6대6)'],
              },
            ],
          },
          {
            hero: '마우가',
            role: 'tank',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/937cbae13f50502b4191c09b7c178ef60d2eadddcdda5bc4268c1541216b8722.png',
            description:
              '마우가는 기관포 하나를 계속 발사하며 높은 수준의 정확도를 유지할 수 있었습니다. 개별 기관포에 동적인 분산도를 추가하여, 집탄 관리를 위해 무기 교체를 권장하도록 했습니다. 이 변경 사항은 두 무기를 동시에 발사할 때의 정확도에는 영향을 주지 않습니다.',
            changes: [
              {
                ability: '기관포',
                bullets: ['하나의 기관포 발사 시 최대 분산도의 범위가 1에서 1.5로 증가했습니다.', '최대 분산도에 도달하기까지의 탄환 수가 0발에서 30발로 증가했습니다.'],
              },
            ],
          },
          {
            hero: '라마트라',
            role: 'tank',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/f54a877264e161c2aa4d5755ef4411eb7fd7e4eb910075936e91ddb043b8a58e.png',
            description:
              '탐식의 소용돌이 폭발 피해가 증가해 정확한 폭발로 더 큰 이득을 볼 수 있습니다. 여기에 라마트라가 펀치 두 번이 아니라 한 번의 펀치 후 즉시 막기를 쓸 수 있도록 막기의 재사용 대기시간을 줄여서 네메시스 형태의 흐름을 개선했습니다.',
            changes: [
              { ability: '탐식의 소용돌이', bullets: ['폭발 피해가 15에서 30으로 증가했습니다.'] },
              { ability: '막기 (네메시스 형태)', bullets: ['재사용 대기시간이 1초에서 0.5초로 감소했습니다.'] },
            ],
          },
          {
            hero: '시그마',
            role: 'tank',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/416f312608ac1d9f34509883daa0fa9486b15ceb112e4440b4c412e125390517.png',
            description: '방어 기술을 적절히 번갈아 사용하는 시그마는 여전히 높은 내구성을 보입니다. 보호막 생명력을 줄여 상대가 방어 돌파에 성공했을 때의 생존력을 낮추었습니다.',
            changes: [
              { bullets: ['보호막 생명력이 275에서 250으로 감소했습니다.'] },
              { ability: '초재생 - 보조 특전', bullets: ['피해 전환량이 40%에서 30%로 감소했습니다.'] },
            ],
          },
        ],
      },
      {
        title: '영웅 업데이트 - 공격',
        heroes: [
          {
            hero: '캐서디',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/5a0a0840565c5810d9a638d391b0403ba743459d52aa9f1c443a9fc87e41f06f.png',
            description: '은탄환의 추가 투사체 크기 덕분에 강화된 사격을 맞추기 상당히 쉬워 특전의 효율이 높았습니다. 기대 피해는 유지하면서 이 추가 효과를 제거하려 합니다.',
            changes: [{ ability: '은탄환 - 주요 특전', bullets: ['투사체 크기가 0.17에서 0.07로 감소했습니다.'] }],
          },
          {
            hero: '프레야',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/7c5a9c6437d89f4703646a934c6a27098dd340abcb6f965bf1335bc10b60e1ae.png',
            description:
              '정조준의 폭발 지연을 감소시키면, 착탄과 피해 발생 시점 사이의 시간이 감소해 더 안정적으로 후속 공격을 연계할 수 있습니다. 반면 적중 시 화살의 잠재적 교란 능력은 감소합니다. 다른 변경 사항은 정조준과 속사 석궁의 기본 발사 간 흐름을 개선하는 데 목표를 두고 있습니다.',
            changes: [
              { ability: '속사 석궁', bullets: ['발사 속도가 5에서 5.5로 증가했습니다.'] },
              { ability: '정조준', bullets: ['회복 시간이 0.5에서 0.4로 감소했습니다.', '폭발 지연이 1초에서 0.8초로 감소했습니다.'] },
            ],
          },
          {
            hero: '리퍼',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/d6d7be4b019c088741f1a27bf643bc3718f06f571fe185441026aaef03115843.png',
            description:
              '리퍼의 유효 생명력이 줄어들어 장기 교전에서 유지력이 감소했습니다. 지속 능력의 효율을 증가시켜 내구성을 일부 향상시키는 동시에, 공격적인 플레이에 대한 보상을 늘렸습니다.',
            changes: [
              { ability: '영혼 강탈자 - 보조 특전', bullets: ['영혼 구슬의 획득 거리가 5미터에서 8미터로 증가했습니다.'] },
              { ability: '영혼 수확', bullets: ['생명력 흡수량이 25%에서 30%로 증가했습니다.'] },
            ],
          },
          {
            hero: '시온',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/ad0931805f9f28f03e8d55fead38ed85ee52f5c75f89aa3deec8a27fdc4fd6b3.png',
            description:
              '처형의 회복 시간을 줄여, 기술 사용 후 시온이 다시 사격할 수 있기까지의 준비 시간이 더 잘 맞도록 조정했습니다. 또한 대상에 계속 충돌시키는 것과, 명중 후 즉시 바이크를 폭파시키는 콤보의 잠재력 효율을 낮추기 위해 조이라이드의 명중 피해를 감소시켰습니다.',
            changes: [
              { ability: '처형', bullets: ['회복 시간이 0.4초에서 0.3초로 감소했습니다.'] },
              { ability: '조이라이드', bullets: ['운전 중 명중 피해가 60에서 30으로 감소했습니다.'] },
            ],
          },
          {
            hero: '시에라',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/9df12aa85763497cd054257ccab04ef055a6c4c39334bbed0cd513ddff5cb395.png',
            description: '앵커 드론을 더 자주 배치하거나 위치 변경이 가능하도록 조절했습니다. 재사용 대기시간과 지속 시간이 줄어드는 대신, 내구도가 늘어나 전투에서 생존성이 개선되었습니다.',
            changes: [
              {
                ability: '앵커 드론',
                bullets: [
                  '재사용 대기시간이 12초에서 11초로 감소했습니다.',
                  '지속 시간이 10초에서 9초로 감소했습니다.',
                  '내구도가 80에서 125로 증가했습니다.',
                ],
              },
            ],
          },
          {
            hero: '벤데타',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/723acfb2d8745f5346e1bb64124d74f5267dfbfeb2008240867925eddf9283b6.png',
            description: '벤데타는 몇 시즌 전 대규모 변경 사항 이후, 계속해서 좋지 못한 성능을 보여주고 있었습니다. 팔라틴 팽의 내리치기 사거리 변경을 되돌려서 거리를 좁히고 처치를 확보하는 능력을 일부 복원했습니다.',
            changes: [{ ability: '팔라틴 팽', bullets: ['내리치기 보너스 사거리가 2.0미터에서 2.5미터로 증가했습니다.'] }],
          },
          {
            hero: '벤처',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/7cab11e20f958ed3d369989e0ac96703fd2cda8c7abf237f75e12bf3549b066e.png',
            description:
              '벤처가 기술을 다시 사용하기까지 걸리는 시간을 줄이고, 회복 시간과도 더 잘 맞도록 갈아 버리기의 재사용 대기시간을 줄였습니다. 이로써 교전 중 갈아 버리기를 더 자주 사용할 수 있게 되고, 먼지투성이 주요 특전과의 시너지 또한 향상됩니다.',
            changes: [{ ability: '갈아 버리기 (빠른 근접 공격)', bullets: ['재사용 대기시간/회복 시간이 1.6초에서 1.2초로 감소했습니다.'] }],
          },
        ],
      },
      {
        title: '영웅 업데이트 - 지원',
        heroes: [
          {
            hero: '아나',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/3c87d470067d61c432815a4bc0c70b11f1b5379006da29625839da356b7c4ca1.png',
            description:
              '지원 영웅 지속 능력의 생명력 재생 지연 감소가 삭제된 후로 아나의 자생력이 감소했습니다. 생체 수류탄의 치유량을 올려 방어적 보조 능력을 강화하는 동시에 공격 효과도 상승시켰습니다.',
            changes: [{ ability: '생체 수류탄', bullets: ['폭발 피해량과 치유량이 75에서 90으로 증가했습니다.'] }],
          },
          {
            hero: '브리기테',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/dbc7d49f32020fed1033cb4bb99b55f7938d1a71108fe76edc589e42c8cd0977.png',
            description: '격려 발동 시 즉시 치유를 추가해 브리기테가 더 즉각적인 치유를 제공하는 동시에, 지속적인 격려 발동에 대한 보상을 플레이어에게 제공하도록 했습니다.',
            changes: [
              {
                ability: '격려',
                bullets: ['이제 발동 시 즉시 생명력을 12만큼 치유합니다.', '지속 치유량이 60에서 45로 감소했습니다.'],
              },
            ],
          },
          {
            hero: '키리코',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/ee8089aae48680d912947d907295c03fce960dc500d806a400c36f59b6ef98d7.png',
            description:
              '치유의 부적의 회복 시간 감소로 키리코의 치유 기술 조작감과 일관성이 개선되었습니다. 그러나 동시에 키리코의 전체적인 치유량이 너무 높아져, 개선된 반응성은 유지하면서도 기본 치유량을 줄이기로 결정했습니다.',
            changes: [{ ability: '치유의 부적', bullets: ['투사체당 치유량이 13에서 12로 감소했습니다.'] }],
          },
          {
            hero: '루시우',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/3a804d4305621bbee0e1472ac79d977799a27b6ae8f44922790cd1393812d5fd.png',
            description: '루시우의 전체적인 효율은 고유의 강력한 속도 보조 능력을 감안해 계속해서 줄어들었습니다. 무기 공격력을 올려서 보조 능력의 위력을 올리지 않으면서도 공격적인 능력을 강화하였습니다.',
            changes: [{ ability: '음파 증폭기', bullets: ['투사체당 공격력이 20에서 22로 증가했습니다.'] }],
          },
        ],
      },
      {
        title: '스타디움 업데이트 - 일반 변경 사항',
        bullets: ['격돌 점령 속도가 시간이 지날수록 최대 300%까지 증가합니다 (이전 최대 200%).', '격돌 점령 속도 증가율이 1초당 2%로 증가했습니다 (1%에서 증가).'],
        paragraphs: ['특히 유지력이 높은 조합에서 스타디움의 격돌 라운드가 지나치게 오래 진행되던 경우가 발생해, 이러한 특이 케이스를 제한하고자 점령 속도를 더 빠르게 만들었습니다.'],
      },
      {
        title: '스타디움 업데이트 - 돌격',
        heroes: [
          {
            hero: '정커퀸',
            role: 'tank',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/a362b9dba4f5f4f704076945f3c72d7d442d536ffcc2fc5735062f4a1cee8031.png',
            changes: [
              { ability: '고귀한 총알 - 파워', bullets: ['공격력이 25에서 20으로 감소했습니다.'] },
              { ability: '고개를 조아려라 - 파워', bullets: ['지속 시간이 2초에서 1.5초로 감소했습니다.'] },
            ],
          },
        ],
      },
      {
        title: '스타디움 업데이트 - 공격',
        heroes: [
          {
            hero: '캐서디',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/5a0a0840565c5810d9a638d391b0403ba743459d52aa9f1c443a9fc87e41f06f.png',
            changes: [{ ability: '총잡이의 투지 - 파워', bullets: ['재장전한 총알당 최대 생명력의 치유량이 2%에서 2.5%로 증가했습니다.'] }],
          },
          {
            hero: '정크랫',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/f807df911fec53e9c86107affc4d7a5c08612ae0de1baafe7c12352a048b9b52.png',
            changes: [{ ability: '지퍼 기름칠 - 파워', bullets: ['공중에 뜬 대상에 주는 피해가 10%에서 25%로 증가했습니다.'] }],
          },
          {
            hero: '메이',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/dc5525ecbba3b254188f126ba0dd07571dee201d4ddc2f068c3e2f6907668cca.png',
            changes: [
              { ability: '둔화 눈뭉치 - 파워', bullets: ['둔화 눈뭉치 투사체의 히트박스 크기 증가를 제거했습니다.'] },
              { ability: '냉기 갑옷 - 파워', bullets: ['준 피해로 전환되는 방어력이 5%에서 3%로 감소했습니다.'] },
            ],
          },
          {
            hero: '리퍼',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/d6d7be4b019c088741f1a27bf643bc3718f06f571fe185441026aaef03115843.png',
            changes: [
              { ability: '가속된 수확 - 파워', bullets: ['중첩당 공격 속도가 4%에서 5%로 증가했습니다.'] },
              { ability: '담대한 바람 - 특급 생존 영웅 아이템', bullets: ['망령화 지속 시간이 50%에서 33%로 감소했습니다.'] },
            ],
          },
          {
            hero: '토르비욘',
            role: 'damage',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/b1b376c95ed7f017b9be712c9069305c7e5cb26b010aa988697805ffa1cc20a5.png',
            changes: [
              { ability: '망치 던지기 - 파워', bullets: ['직관성을 위해 잔상 시각 효과를 추가했습니다.'] },
              { ability: '대장장이 - 파워', bullets: ['치유가 망치 공격력의 75%에서 100%로 증가했습니다.'] },
              { ability: '와서 방어구 챙겨 - 파워', bullets: ['제공하는 방어력이 최대 생명력의 20%에서 15%로 감소했습니다.'] },
              { ability: '고정 나사 - 특급 영웅 기술 아이템', bullets: ['기술 위력이 15%에서 10%로 감소했습니다.'] },
            ],
          },
        ],
      },
      {
        title: '스타디움 업데이트 - 지원',
        heroes: [
          {
            hero: '주노',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/342a43327798660f29039e6a7f3f0a922097b03419eded7434cb1edb2e444bbb.png',
            description: '이 변경으로 다수의 재사용 대기시간 감소 아이템을 함께 사용하면 점멸 부스터의 상한이 줄어들 것입니다. 기술 사용 시 발동 아이템과 점멸 부스터의 시너지는 계속 주시할 예정입니다.',
            changes: [
              {
                ability: '점멸 부스터 - 파워',
                bullets: ['감소한 재사용 대기시간이 이제 재사용 대기시간 감소를 얻은 것이 아니라, 기본 재사용 대기시간으로 간주됩니다. 이제 재사용 대기시간 감소와 합연산이 아니라 곱연산으로 적용됩니다.'],
              },
            ],
          },
          {
            hero: '키리코',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/ee8089aae48680d912947d907295c03fce960dc500d806a400c36f59b6ef98d7.png',
            changes: [
              { ability: '분신술 - 파워', bullets: ['분신의 효율 감소 수치가 75%에서 65%로 변경되었습니다.'] },
              { ability: '예리한 쿠나이 - 파워', bullets: ['치명타 시 재사용 대기시간 감소 효과가 15%에서 20%로 증가했습니다.'] },
            ],
          },
          {
            hero: '루시우',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/3a804d4305621bbee0e1472ac79d977799a27b6ae8f44922790cd1393812d5fd.png',
            changes: [
              { ability: '리듬 레일 - 파워', bullets: ['피해가 75%에서 100%로 증가했습니다.'] },
              { ability: '솜씨 좋은 공연자 - 파워', bullets: ['치유량이 소리 파동 공격력의 33%에서 40%로 증가했습니다.'] },
            ],
          },
          {
            hero: '메르시',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/55e281170eb6d65b2bece475b1179ccf37810dfb46b957705227d566cb38be9e.png',
            changes: [{ ability: '왜곡 - 파워', bullets: ['부여하는 추가 생명력이 최대 생명력의 30%에서 25%로 감소했습니다.'] }],
          },
          {
            hero: '우양',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/dede4dc963baf0a5dd136f4d66af8d8741010410eda17a15df430fee9a6afc85.png',
            changes: [{ bullets: ['피해 또는 치유로 얻는 재화량이 8.33% 증가했습니다.'] }],
          },
          {
            hero: '젠야타',
            role: 'support',
            portraitUrl: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/58a05fe509b6b5333a4e3bf761afab6493420bf58fa2fac834ca1d3f779961d2.png',
            changes: [
              { ability: '깨달음 - 파워', bullets: ['치유량이 준 피해의 40%에서 30%로 감소했습니다.'] },
              { ability: '내면의 평화 - 파워', bullets: ['치유량 감소가 75%에서 80%로 변경되었습니다.'] },
            ],
          },
        ],
      },
      {
        title: '아이템 변경 사항',
        bullets: [
          '볼스카야 군수품 (특급 무기 일반 아이템): 대상의 추가 생명력 100마다 얻는 추가 피해가 5%에서 6%로 증가했습니다.',
          '가젯 극대화 (특급 기술 일반 아이템): 가젯 재사용 대기시간 감소 효과가 25%에서 35%로 증가했습니다.',
          '3연속 토미건 발사 (특급 기술 일반 아이템): 연속 적용 시 내부 재사용 대기시간 0.5초를 추가했습니다. 피해가 대상의 현재 생명력 5%에서 3%로 감소했습니다. 피해 지속 시간이 5초에서 3초로 감소했습니다.',
          '소용돌이 약병 (가젯): 비용이 9,500에서 9,000으로 감소했습니다. 재사용 대기시간이 25초에서 15초로 감소했습니다.',
        ],
        paragraphs: [
          '3연속 토미건 발사의 효율이 지나치게 높다는 결과가 나와, 이를 줄이고 다수의 중첩을 빠르게 적용하기 어렵게 만들었습니다. 또한 비행체 대항 가젯을 중심으로 사용 빈도가 낮은 카운터 옵션 일부를 개선하였습니다.',
        ],
      },
      {
        title: '사용자 지정 게임 업데이트',
        bullets: ['설정 > 영웅 > 시온 아래에 조이라이드 무한 옵션을 추가했습니다.'],
      },
      {
        title: '버그 수정 - 일반',
        bullets: [
          '시온의 영웅 도전 과제가 알파벳 순서로 정렬되지 않던 문제를 수정했습니다.',
          '총을 바꿀 때 마우가의 조준선 분산도가 정확하지 않던 문제를 수정했습니다.',
          '시에라의 개척자 드론이 기절 기술로 중단되던 문제를 수정했습니다.',
          '고급 정보 패널의 몇 가지 텍스트 버그를 수정했습니다.',
        ],
      },
      {
        title: '버그 수정 - 스타디움',
        bullets: [
          '정커퀸의 블러드하운드 가면이 부상에서 보너스 무기 위력을 제대로 제공하지 않던 문제를 수정했습니다.',
          '둠피스트의 아군 균열로 인해 거리에 관계없이 파멸의 일격이 최대 피해를 주던 문제를 수정했습니다.',
          '캐서디의 총잡이의 투지가 재장전이 끝나기 전 발동하던 문제를 수정했습니다.',
          '사이버베놈으로 기술 피해를 준 후 아군을 치명타로 치유할 시, 치유량 감소가 아군에도 적용되던 문제를 수정했습니다.',
          '뗄 때 벽에서 점프 옵션을 끈 상태에서 루시우의 힙합이 제대로 작동하지 않던 문제를 수정했습니다.',
          '메이의 성에가 궁극기 충전을 올바르게 제공하지 않던 문제를 수정했습니다.',
          '라마트라의 방벽이 기술 위력에 제대로 비례하지 않던 문제를 수정했습니다.',
          '강화 효과 활성화 중 파워를 판매했을 때, 메이의 둔화 눈뭉치가 항상 강화 투사체처럼 보이던 문제를 수정했습니다.',
          '키리코의 바람에 실린 나뭇잎이 때때로 적을 대상으로 하던 문제를 수정했습니다.',
          '이전 업데이트에서 모이라의 망령 광선 효율 수치가 올바르지 않던 문제를 수정했습니다.',
        ],
      },
    ],
  },
  {
    version: '2026-07-01',
    patchDate: '2026년 7월 1일',
    title: '오버워치 패치 노트 - 2026년 7월 2일',
    highlight: '핫픽스 업데이트입니다. 7월 1일 패치부터 생성된 리플레이 코드는 계속 이용할 수 있습니다.',
    sections: [
      {
        title: '커뮤니티 제작 이벤트',
        bullets: [
          "'스트리머의 행운' (커뮤니티 제작 모드에서 서로 다른 영웅으로 승리) 도전 과제 완료 조건이 20회에서 3회로 감소했습니다.",
          "'여러분, 우리 망했나요?' 메타 도전 과제 완료 조건이 14회에서 13회로 감소했습니다.",
          "'클릭 낚시 완화' 피해 완화 요구치가 15,000에서 5,000으로 감소했습니다.",
        ],
      },
    ],
  },
];
