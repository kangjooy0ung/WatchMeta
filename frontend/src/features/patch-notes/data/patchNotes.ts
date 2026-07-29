import type { PatchNote } from '../../../types/patchNote';

// 출처: https://overwatch.blizzard.com/ko-kr/news/patch-notes/ (2026-07-29 확인)
export const PATCH_NOTES_SOURCE_URL = 'https://overwatch.blizzard.com/ko-kr/news/patch-notes/';

export const PATCH_NOTES: PatchNote[] = [
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
