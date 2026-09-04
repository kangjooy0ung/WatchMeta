// 특전 이름·설명·아이콘 출처: OverFast API (https://overfast-api.tekrop.fr/heroes/{key}?locale=ko-kr), 2026-09-04 확인
// 커뮤니티 선호율(preferRate) 출처: owperks.com 커뮤니티 투표 집계 (2026-09-04 확인). 실제 게임 내 채용률이 아니라
// 플레이어들이 '가장 자주 고른다'고 응답한 비율이며, 두 특전 중 나머지 하나는 (100 - preferRate)로 환산했다.

export interface Perk {
  name: string;
  description: string;
  icon: string;
  /** owperks.com 커뮤니티 투표 기준 이 특전을 고른다고 응답한 비율(%) */
  preferRate: number;
}

export interface HeroPerks {
  /** 레벨 2에 하나 선택하는 마이너 특전 2종 */
  minor: [Perk, Perk];
  /** 레벨 3에 하나 선택하는 메이저 특전 2종 */
  major: [Perk, Perk];
}

export const PERKS_SOURCE_URL = 'https://overwatch.blizzard.com/ko-kr/heroes/';
export const PERKS_PREFER_SOURCE_URL = 'https://owperks.com';
export const PERKS_CHECKED_AT = '2026년 9월 4일';

export const HERO_PERKS: Record<string, HeroPerks> = {
  'ana': {
    minor: [
      { name: '혼미', description: '수면총에서 깨어난 적이 느려지고 2초에 걸쳐 50의 피해를 받습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/261f0fabdaf55159b9e13103abd465cfe3bf50a3906f97b1a47e9c2dc961905b.png', preferRate: 18 },
      { name: '가속 혈청', description: '나노 강화제가 아나와 대상 모두의 이동 속도를 30% 증가시킵니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/2dc4cdf319916abf18c9972b4fb8d14e5dd92e319960b36846c270b3bd5ffa4f.png', preferRate: 82 },
    ],
    major: [
      { name: '생체 수류탄 튕기기', description: '폭발 후, 생체 수류탄이 튕겨 다시 폭발합니다. 두 번째 폭발은 60의 피해와 치유량을 갖습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/388dfc3c6fb4cb6a233350b887d1400876890a33c79e49d7fb3c6ca220eddc31.png', preferRate: 26 },
      { name: '인간사냥꾼', description: '생체 소총이 적에게 치명타를 줄 수 있습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/fe56a0ef536dd3f17d3c7728151ff60ef1a48071e93c2071c095f4e1712e6721.png', preferRate: 74 },
    ],
  },
  'anran': {
    minor: [
      { name: '불씨', description: '불태우기가 적을 1.5초 더 오래 불태웁니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/5d927315af0a5729ab1be838556dc1e2d9206bbe0fd69bf3c084b64a761c9b12.png', preferRate: 69 },
      { name: '열 보호막', description: '궁극기 사용 중에 궁극기로 불태운 적 하나당 추가 생명력을 50 얻습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/52a35ec19286d15384a73910c2763d02774674069f3cfd0ee5681afd545f3c82.png', preferRate: 31 },
    ],
    major: [
      { name: '급한 성미', description: '맹염 질주로 적과 충돌하면 재사용 대기시간이 1.5초 감소합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/6aedcee19eff304025cefdba8f089cf356293389088f53c8c6f4de11a008ba63.png', preferRate: 33 },
      { name: '굶주린 불꽃', description: '춤추는 불꽃 연쇄 공격의 치유량이 25 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/110e0b00345b359281b3ae871725d149051bed40fce266435806b4c390729722.png', preferRate: 67 },
    ],
  },
  'ashe': {
    minor: [
      { name: '원격 기폭', description: '다이너마이트를 사용한 후 E 키를 다시 누르면 0.5초의 지연 후 폭발합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/aa6a6fe0ff9bc45cd066c0938191f02c59b81c97c4b1d74d6de14550894fbf7c.png', preferRate: 88 },
      { name: '이중 총열', description: '충격 샷건으로 적을 밀쳐내면 2초 내에 추가로 1회 사용할 수 있습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/cb7352dd49a08b2b95183a0ae7ef831f711754167e84968316c72052ec0affe8.png', preferRate: 12 },
    ],
    major: [
      { name: '독사의 침', description: '저격이 2회 연속으로 대상에 명중하면 25의 추가 피해를 줍니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/24f39937222b86f1b15717b96ab8b344104a9b69aaca142965d6c8ebc841a5ca.png', preferRate: 80 },
      { name: '공중 폭발', description: '공중에서 다이너마이트 폭발 반경이 40% 증가하고, 투척 시 탄약 6발을 돌려받습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/5c01e6810c9aac8d790e97f6b1e090aef6e89970c16eb9601812332e1cdb8f8f.png', preferRate: 20 },
    ],
  },
  'baptiste': {
    minor: [
      { name: '확대장', description: '불사 장치의 반경이 30% 커집니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/99a5dc8c29d169d2c8e095495657d8d69a57e19e311f8282c8d5f6648cd74f9e.png', preferRate: 39 },
      { name: '맹공의 파동', description: '치유 파동이 3초 동안 바티스트의 공격 속도를 20% 증가시킵니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/78de19e8f754a2882980435a03ada17d1bd791bbec10bfa9a076cdf82ef9ccce.png', preferRate: 61 },
    ],
    major: [
      { name: '자동화 치유', description: '아무 기술을 사용하면 바티스트의 견착식 포탑이 활성화되어 아군에게 주기적으로 최대 3회 발사해 매번 40의 생명력을 치유합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/0ba2344d9af993c4ba4f74f7a381327f20bcf153e78d2b0269a2fa1ef5884a6a.png', preferRate: 72 },
      { name: '로켓 전투화', description: '외골격 전투화로 공중에 떠 있을 때 스페이스 바 사용 시 수평 방향으로 돌진합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/d2a943d5fce3bba49e1f482c0cd56973cb287fb40d2fd089f40a15047856a378.png', preferRate: 28 },
    ],
  },
  'bastion': {
    minor: [
      { name: '스마트 폭탄', description: 'A-36 전술 수류탄의 자신 밀쳐내기 효과가 25% 증가하고, 더 이상 자신에게 피해를 주지 않습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/813550a1cb8390ac118eb81441c1b76bf40bf0ff536cfb2fdb0ed1e8ab53262f.png', preferRate: 29 },
      { name: '설정: 재장전', description: '설정 변경 시 A-36 전술 수류탄의 재사용 대기시간이 4초 감소합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/0e3078ec09e5ad1bf131e3cfd820e6dd7fe0cf568545a7093e0b2b41e019f995.png', preferRate: 71 },
    ],
    major: [
      { name: '린드홀름 폭발물', description: '설정: 강습 모드 무기가 기관포 대신 느리게 폭발탄을 발사합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/18e73dc037267e2b8e315bbbc76c826360633cc67f16dedeed21a86cd4f7f97e.png', preferRate: 26 },
      { name: '자가 수리', description: 'E 키를 누르면 자신을 매우 빠르게 치유합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/0322e5394e3b67a011c27be4d8c84c0a4f74771d557339ac680dae7edbc3aaf7.png', preferRate: 74 },
    ],
  },
  'brigitte': {
    minor: [
      { name: '전투 의무관', description: '적에게 근접 공격 시 수리 팩의 재사용 대기시간이 0.75초 감소합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/653e76687c41ac4c2f6aa02bcb0277228c13a7d0ac62b8b4dc6259191bad98ff.png', preferRate: 20 },
      { name: '사기 증진', description: '도리깨 투척으로 발동하는 격려의 지속 시간이 3초 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/ce74272f296ac761d22db50718ce39fe4622c0304cc2570ab9a7e2bb82ca135f.png', preferRate: 80 },
    ],
    major: [
      { name: '격려 타격', description: '방패 밀쳐내기 사용 시 2초 동안 이동 속도가 30% 증가합니다. 방패 밀쳐내기로 격려가 활성화될 경우 즉시 치유됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/a1a518ab82a42370401a2b3e4284e7efca3f2eb4bc2dd55d11755ea192afcae8.png', preferRate: 87 },
      { name: '채찍질', description: '도리깨 투척의 밀쳐내기 효과로 적을 벽에 충돌시키면 60의 추가 피해를 줍니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/9d6a8ce740dd9b84adc1b60a518501c66d83f4c592ae84dec4cd3c9e4f159a40.png', preferRate: 13 },
    ],
  },
  'cassidy': {
    minor: [
      { name: '번쩍번쩍', description: '캐서디가 더 멀리 날아가는 두 번째 섬광탄을 던지지만, 두 섬광탄의 피해가 모두 40% 감소합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/4cf99ebedab5eb72e47c1388000cb29ad521fb2faf7e7b31f526bbbe3f212632.png', preferRate: 69 },
      { name: '이랴!', description: '구르기 사용 후, 캐서디가 1.5초에 걸쳐 사라지는 이동 속도 증가 효과를 얻습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/b0d48ad9c8bdf1ce4ec5aeb9fe01b8fe8c1db55e4a5c411eedb74a7c41967526.png', preferRate: 31 },
    ],
    major: [
      { name: '굴러 모으기', description: '구르기 사용 시 재장전한 탄약 한 발당 생명력 또한 15씩 치유합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/4eb33f06a39774d03562b84d4541ed691de840de3aedefc18fb6b809a9f01b8f.png', preferRate: 9 },
      { name: '은탄환', description: '피스키퍼의 보조 발사가 출혈을 유발하는 관통 사격으로 대체됩니다. 구르기와 황야의 무법자 사용 시 재사용 대기시간이 초기화됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/383425b058c7a8a60439132ecb199ea59e91be71b7e57835019c28beb7f080a2.png', preferRate: 91 },
    ],
  },
  'domina': {
    minor: [
      { name: '효율적인 설계', description: '방벽 배열 사용 후, 50의 보호막을 회복하고 지속 체력 재생을 활성화합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/e875e96eb7ae576aadb73eda105c4c75c7d6ee8e838db32d7f157e381eaff665.png', preferRate: 32 },
      { name: '출력 확장', description: '광자 매그넘의 사거리가 20% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/8525083a67878879365273e04f3a6b2f8585b804f457a4b34b005d52204a70cc.png', preferRate: 68 },
    ],
    major: [
      { name: '분열 폭발', description: '수정 발사 폭발에 적중당한 적이 2초 동안 30% 둔화됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/7dc9179235d865d3d3725fec2c7dce9a042a727dd2715028e30484ca97610336.png', preferRate: 28 },
      { name: '사업장 이전', description: '방벽 배열이 활성화되어 있는 동안, 다른 위치로 1회 옮길 수 있습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/6006092e920e1e719a22090967108f164083e4217a748fabfc00eb905724b421.png', preferRate: 72 },
    ],
  },
  'doomfist': {
    minor: [
      { name: '원투', description: '로켓 펀치를 맞은 적이 벽에 부딪히면 철권포 탄약을 재장전하며, 2발 추가로 장전합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/cba3de1c0d4fa0f5283b1a5490952d52ba3e6de9b1e01fde4241bf3bfe453b07.png', preferRate: 39 },
      { name: '적자생존', description: '처치 시 최선의 방어는...이 25의 추가 생명력을 부여하며, 최선의 방어는...으로 얻는 추가 생명력 최대치가 50 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/0eaf218a00f6a8070c4ead8272cb00113022d89d145a94bf3cebb812b062798f.png', preferRate: 61 },
    ],
    major: [
      { name: '여진', description: '지진 강타에 적중당한 적이 2초 동안 40% 둔화됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/8fd3cab5cd978820e2d79bf8180d3b76bfdf22cdf622cf8671bba3924385f025.png', preferRate: 11 },
      { name: '파워 매트릭스', description: '파워 블락이 지속 시간의 첫 0.8초 동안 투사체를 흡수합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/0b831053f68b3255806c0da470c2c8b9a8fff17f5bd04839bba0fa407618ea43.png', preferRate: 89 },
    ],
  },
  'dmon': {
    minor: [
      { name: '내면의 야수', description: '플라스마 세이버 적중 시 파워 배리어 내구도가 40 회복됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/a49a4aa586ec9a0f10b16d299e541fdfeb6da4ee2c1bf75a4f2bab1f4170ee45.png', preferRate: 60 },
      { name: 'MEKA 기동성', description: '파워 배리어를 유지할 때 추진기 연료 비용이 30% 감소합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/8d2f97ae5a2dc9b137d45bcf277030fc32754a67155c55d3d7f0525d6ea9ac6e.png', preferRate: 40 },
    ],
    major: [
      { name: '추가 강타', description: '돌진 강타가 150%의 생명력 흡수 효과를 얻습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/b87f463706a6816a371f8c8b0cb62cd77f33860e85baa19998dd2aad97f89662.png', preferRate: 50 },
      { name: '집중 융합', description: '융합 연발총의 발사 속도가 느려지지만, 분산 없이 더욱 강력한 탄을 발사합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/46d8466d7de4b04dea213c55cae621e407206055eb3b9247796b3f8cd7ba2b4e.png', preferRate: 50 },
    ],
  },
  'dva': {
    minor: [
      { name: '토끼 파워', description: '비상 탈출 후 일시적으로 75의 추가 생명력을 얻고, 메카 호출의 피해 반경이 50% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/54ead00f47feb653f1f96d36df958d12a4d8134f800e6047985011ee5e636f2c.png', preferRate: 16 },
      { name: '확장 부스터', description: '부스터가 적에게 적중하면 40% 증가한 피해를 주며 지속 시간이 0.5초 연장됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/b608a2bec9030da11e1ba0aaaa09276ab5bbd50f5c4b29b937c6fea7292145b0.png', preferRate: 84 },
    ],
    major: [
      { name: '보호막 시스템', description: '생명력 100을 보호막으로 전환합니다. 방어 매트릭스가 흡수한 피해의 25%만큼 보호막을 회복합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/8c050a50706ca610e8a4500865366d993e644125f1b2a987e6c763d9cc5d7763.png', preferRate: 72 },
      { name: '집중 융합', description: 'R 키를 누르면 3초 동안 융합포의 집탄율이 75% 감소합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/8399d146264d0b180cf50a2e96661d7ae408a4a7eb60cad67c80812a18c35f1a.png', preferRate: 28 },
    ],
  },
  'echo': {
    minor: [
      { name: '공중 탄약', description: '비행 중 에코의 탄약이 무한합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/63cadc2da0d3063b10f9add1480a6ebff8c87963de15a9fdfdb22e9356429c07.png', preferRate: 9 },
      { name: '부분 스캔', description: '복제가 궁극기 충전 30% 상태로 시작합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/150c696d8ec1329c43c139c68729ea408ae03216d41b5e759d5b7648d8584605.png', preferRate: 91 },
    ],
    major: [
      { name: '전탄 발사', description: '점착 폭탄이 추가 투사체 2발을 발사합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/47a96fff39ffc551e830cd5cb3f3baf424563e9fd263a2779e01eb1bd5a7d8a4.png', preferRate: 43 },
      { name: '집중 돌진', description: '광선 집중의 사거리가 8미터 증가하고 활성화 시 이동 속도가 25% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/13a06093b579b9a0588d37534cf8fd8f31e3c129f67b3585b58dca171fcdca68.png', preferRate: 57 },
    ],
  },
  'emre': {
    minor: [
      { name: '제압 보장', description: '오버라이드 프로토콜의 경량탄이 적을 1.5초 동안 30% 감속시킵니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/241ca51517666e1a6d64dda896c55d67151beab7e7ba1a54936beddb00186261.png', preferRate: 29 },
      { name: '향상된 민첩성', description: '발사 중이 아닐 때 사이펀 블라스터의 이동 속도 보너스가 20% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/0a82995c66a16506c6637fa41deefa87b913bb398126e68091ff308f544d9219.png', preferRate: 71 },
    ],
    major: [
      { name: '히트 싱크', description: '사이펀 블라스터 명중 시 열기를 60% 돌려받고 지속 시간이 0.1초 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/be7d093a726667fb18c02a46983edf58dda1e07c1e6b411e202461414d28ccba.png', preferRate: 82 },
      { name: '사이버 부착', description: '사이버 파편 수류탄이 적중 시 부착되고, 부착한 적에게 40의 추가 피해를 줍니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/c1e486e48f92254734e19a47d63672f81c187bfbcb524f9634fe295ea89d36ee.png', preferRate: 18 },
    ],
  },
  'freja': {
    minor: [
      { name: '가혹한 포화', description: '정조준으로 명중 시 자동 화살 탄약 8발을 돌려받습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/b4716c0312754221a259f0d7dd2bf04eb3671b8f2bb70692854217403137d0d4.png', preferRate: 61 },
      { name: '가속 증폭', description: '재빠른 돌진의 거리가 20% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/2444e973875857e2425dfcc64f3aa5de3aba82fe12887134e6cfb38172a074f6.png', preferRate: 39 },
    ],
    major: [
      { name: '공중 회복', description: '상승기류를 사용한 후, 프레야가 땅에 닿을 때까지 생명력을 초당 30 치유합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/e374851a1c97f54461526905d9e97b3466ea7ef0c7c592994eb098e404a7ef2a.png', preferRate: 74 },
      { name: '솟구치는 바람', description: '상승기류 충전 횟수가 1 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/4ac4daca1df0efba3715a3406834bf8efb379dc636682e7d771377dc5139c3f9.png', preferRate: 26 },
    ],
  },
  'genji': {
    minor: [
      { name: '신속 베기', description: '빠른 근접 공격 시 질풍참의 재사용 대기시간이 3초 감소합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/72c205ea67dbe8dad29066f1b63b9377fe269eb134a2d58c203c16ed9e641f0c.png', preferRate: 27 },
      { name: '용의 갈증', description: '용검을 휘두르면 생명력 흡수를 30% 얻습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/8eaca93d060776d4d3204338656e0aaad85afeeae516d21e47ccfc91aae4efde.png', preferRate: 73 },
    ],
    major: [
      { name: '회전하는 칼날', description: '적의 생명력이 절반 미만이라면 질풍참이 25의 추가 지속 피해를 줍니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/abcef6f42d1803faa1442b14f351ba1165f93c993e8530145d165e43419dda1d.png', preferRate: 60 },
      { name: '명상', description: '튕겨내기가 활성화되어 있는 동안 생명력을 초당 50씩 회복합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/f6046ca3bc6b1dde0cece4f255b2e30eba0ef50aecff6ecfbe3858b0ee7cc4c2.png', preferRate: 40 },
    ],
  },
  'hanzo': {
    minor: [
      { name: '음파 분열', description: '음파 화살이 근처의 생명력 팩을 30초 동안 해킹합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/87e55e35423446812982cb7bb692f2ae1f3f344b9eff67240468c3eb884bad87.png', preferRate: 69 },
      { name: '용의 분노', description: '기본 발사가 적에게 적중하면 1.5초 동안 공격 속도가 20% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/19a87e5ad2913df72cfb62ab905bd15328ef6b02a6aa4beb15fe37337f3d69ad.png', preferRate: 31 },
    ],
    major: [
      { name: '냉기 화살', description: 'R 키를 눌러 폭발성 냉기 화살을 준비합니다. 냉기 화살에 적중당한 적은 2초 동안 35% 둔화됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/73b91f4b7b4e7b5250ff1e7c1e027bb3a543fce82d607e3363d1cca2771fc83d.png', preferRate: 66 },
      { name: '갈래 화살', description: '폭풍 화살이 처음 튕기면 5개의 투사체로 갈라져 33%의 피해를 주고, 1회 더 튕깁니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/32b18f33f63e27446cb66662a1e26ec9fff6456bbfe75e17634174ca44885c14.png', preferRate: 34 },
    ],
  },
  'hazard': {
    minor: [
      { name: '재편성', description: '가시벽 적중 시 날카로운 저항의 에너지가 25% 추가로 초과 충전됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/62bfe61a4ea9e9152030ab3b52d52d16eeb5db74fdb1109d1e9545e79011d62c.png', preferRate: 10 },
      { name: '무정부 광신자', description: '날카로운 저항의 가시가 40%의 생명력 흡수 효과를 얻습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/5769d726c1fd432aee499cc0adfc4812a82bd3a928af713302de5157e03986cd.png', preferRate: 90 },
    ],
    major: [
      { name: '깊숙이 덤벼들기', description: '덤벼들기의 사거리가 20% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/26384e47df6a6723ce3a777ae72b667f60f4bdf317ac87bd01df4af34dbb95b9.png', preferRate: 78 },
      { name: '폭발성 꿰뚫기', description: '본스퍼의 가시가 대상에게 표식을 남깁니다. 빠른 근접 공격과 덤벼들기로 상대를 베면 가시가 폭발하여 30의 폭발 피해를 줍니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/d6c6cff5997b09cc6c02c03b0d2bfce48afc4bbf3f95717ea337f633af985b5f.png', preferRate: 22 },
    ],
  },
  'illari': {
    minor: [
      { name: '빠른 조립', description: '치유의 태양석이 300% 빠르게 설치되고 재사용 대기시간이 2초 감소합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/4b8c74a61160d2de10a3105ce10635be1d623c52f3dfacd633ae20c1d6a1045b.png', preferRate: 29 },
      { name: '하지', description: '태양 작렬 사용 시 일리아리의 비행 및 공격 속도가 20% 증가하고, 비행 지속 시간이 3초 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/b31ad6c4eea05cd96084c7b87509b0c3678ac8f04678f388863f16a271e496c4.png', preferRate: 71 },
    ],
    major: [
      { name: '태양의 섬광', description: '태양 소총의 치유 광선을 사용하는 동안  키를 누르면 일리아리 앞에 있는 모든 아군을 100 치유합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/3b39d69790004174fc0367ed9c7fbce8e430ffe8e885c8e32ae1d678fd8c42e5.png', preferRate: 12 },
      { name: '일광 화상', description: '분출이 적을 불태워 3초에 걸쳐 50의 추가 피해를 줍니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/2405e6d589b8d6c7bd5e072f7788480bbcfeda6a1ce48ad67e2d8915289e8798.png', preferRate: 88 },
    ],
  },
  'jetpack-cat': {
    minor: [
      { name: '숨은 동기', description: '생체 냥냥탄 치유량의 15%만큼 연료가 회복됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/1d18749d884a8c09dfa5789c5f31eb99f6c78e4b93b3268960f60730abcaf924.png', preferRate: 93 },
      { name: '운송 보호막', description: '다른 영웅을 운반하는 동안 추가 보호막 내구도를 최대 50 얻습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/acd4b58fc4607cf4471de067547d9dd1fd1760fbf55d67217f0574567aa0e98b.png', preferRate: 7 },
    ],
    major: [
      { name: '냥벽한 골골대기', description: '골골대기의 각 파동이 세 번 물결칩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/7b90c625a71b1ab6709796db494907b934637e3f793895d4729f0387fadbc35f.png', preferRate: 34 },
      { name: '발톱 꺼내기', description: '빠른 근접 공격이 6초마다 강해지고, 적에게 상처를 입혀 40의 피해를 주며 1초 동안 30% 감속시킵니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/989caae5faf782438c32b4ed7451ac93ebff03d884c065c768c1cee265b8aae9.png', preferRate: 66 },
    ],
  },
  'junker-queen': {
    minor: [
      { name: '광분 돌진', description: '살육 사용 시 저지 불가 상태가 되고 모든 재사용 대기시간이 6초 감소합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/69acb5b21896563bbddc2d166f1d53b31ab96257adec55ca0fb20a9d38f1e726.png', preferRate: 81 },
      { name: '전투의 외침', description: '지휘의 외침이 산탄총을 완전히 재장전하고 아군의 재장전 속도를 50% 증가시킵니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/c0c7a9fabfe1e722d591074d61212cd951ca241daf4f857e16277520f66a7bf2.png', preferRate: 19 },
    ],
    major: [
      { name: '선풍', description: '톱니칼을 회수하면 반경이 100% 증가하고 30의 추가 명중 피해를 줍니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/79f03361567257341b863613a591508eca0077c5b934a590f6ed34822616f005.png', preferRate: 27 },
      { name: '맹렬한 포식', description: '도륙이 명중하여 피해를 주면 100%의 생명력 흡수 효과를 얻습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/6f359a8501d72e8e4b4fcceff1dc353b68a4303bfb5e0f853d894b2478d0bce4.png', preferRate: 73 },
    ],
  },
  'junkrat': {
    minor: [
      { name: '니트로 부스트', description: '죽이는 타이어가 활성화되어 있는 동안 좌Shift 사용 시 속도가 잠시 동안 증가합니다. 이때 죽이는 타이어의 피해가 50% 감소합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/150e4b3594f8ddc25eca19a90f39ca146c9dfcd5449e7538c5c131ee15b2277b.png', preferRate: 64 },
      { name: '빵 터지는 여행', description: '충격 지뢰로 밀쳐진 후, 정크랫의 공격 속도가 3초 동안 35% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/11b40305e441dbcdfcd86232e84758683d290f13ef0d28fe9dc7e0c3aa8d3d24.png', preferRate: 36 },
    ],
    major: [
      { name: '지뢰 재활용', description: '충격 지뢰로 처치하면 충전 수가 하나 회복됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/76e4650ee601f21fa966ff326d80366271d862199f7250edaafa9033aa29e236.png', preferRate: 14 },
      { name: '폭탄 발사포', description: '폭탄 발사기의 투사체 속도가 25% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/046617c7617e09bec3445e0b3059d6157f1bdabe842650ec2ed3962634a52da0.png', preferRate: 86 },
    ],
  },
  'juno': {
    minor: [
      { name: '익숙한 포착', description: '펄사 어뢰가 아군을 35% 빠르게 포착합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/c797b7a1b9be4f7df0cf86824570d408ed7a0e4112ad51545b3eaf78c4dbf44a.png', preferRate: 21 },
      { name: '대상 포착', description: '펄사 어뢰가 적에게 적중할 때마다 재사용 대기시간이 1초씩 감소합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/477a3abe9f68e2a2324e3f2a8faeb14bb6102b2e0c272d93463d6d27726629ae.png', preferRate: 79 },
    ],
    major: [
      { name: '이륙', description: '화성식 오버부츠로 3단 점프가 가능해집니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/efe7a92601ea7fc95274ee11d1628fb31238c707331b87545a7c754fcd48ca68.png', preferRate: 60 },
      { name: '고속 블라스터', description: '글라이드 부스터가 활성화된 동안 메디블라스터가 계속 발사됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/7b122bd8091f5005bfee07aa787f98126ddbe80aacdd11e7a2d076b9d03e35b2.png', preferRate: 40 },
    ],
  },
  'kiriko': {
    minor: [
      { name: '긴급 치료', description: '생명력이 절반 미만인 아군 추적 시 치유의 부적 투사체 속도가 50% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/d057fa16941cc466d1d934ad3270ba3e6dc6fdd30b8ae78af0d8c684a4afbd21.png', preferRate: 23 },
      { name: '점술가', description: '쿠나이 적중 시 앞에 있는 아군에게 치유의 부적 2장을 날립니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/50a9304063fc8ea8c23b6533940563cf666fb0a1f80e6240b30344aa014d40b6.png', preferRate: 77 },
    ],
    major: [
      { name: '준비 단계', description: '순보 사용 시 3초 동안 키리코의 공격 속도와 재장전 속도가 40% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/e5443afa1c9fe57e7839befb9a986eb960fb08d66a0085f1bba898335a7eb740.png', preferRate: 18 },
      { name: '여우걸음', description: '정화의 방울이 4초 동안 아군의 이동 속도를 30% 증가시킵니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/cd3b70802f80c187212db9a9db342e6aa4f0cd349d1979055e52eb7539a8cc30.png', preferRate: 82 },
    ],
  },
  'lifeweaver': {
    minor: [
      { name: '꽃잎 보호', description: '아군이 연꽃 단상에 서 있는 동안 생명력이 초당 20씩 치유됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/1efd5d2d43a1bcbd135d7fb815d8fa8211d43a0c9aaf9bb091652ebb543e4a6a.png', preferRate: 24 },
      { name: '질주 탈출', description: '산들 걸음의 거리가 30% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/3fd45b41f03f1d54652bf4581c7894cbef10a3b6dfe0f3a13132537cf0b4ff58.png', preferRate: 76 },
    ],
    major: [
      { name: '씨앗 뿌리기', description: '치유의 꽃으로 빠른 근접 공격을 사용하면 씨앗을 던집니다. 다른 아군이 씨앗을 주우면 추가 생명력 및 이동 속도가 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/53c7d91e379667b66889bffbd535f14c62e1dbdfc10622f43c25ad9d3d973291.png', preferRate: 17 },
      { name: '초월 개화', description: '2.5초 이내에 충분한 수의 가시가 꽂히면, 가시가 폭발하여 40의 추가 피해를 줍니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/fc70f669169965a725f86e2d4dc21d3bd2f1610b2dd2c1a5b4abb948413e1c05.png', preferRate: 83 },
    ],
  },
  'lucio': {
    minor: [
      { name: '소리 파동 타기', description: '벽 타기 시 다음 소리 파동이 강화되어 밀쳐내기 효과가 25%, 피해가 50% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/5ab9044637d85c3c53022189dbab7913eec2faedc95176069a754441588ac630.png', preferRate: 48 },
      { name: '비트 드롭', description: '소리 방벽을 시전하는 동안 볼륨을 높여라!가 활성화됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/4639fbbde04ac4e8ca26a56ebd4ddc3f34ccf5c20add8796fe2282a2b2b739fa.png', preferRate: 52 },
    ],
    major: [
      { name: '소음 공해', description: '볼륨을 높여라!가 활성화되어 있는 동안 분위기 전환!의 사거리가 150% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/37679a0a1cca337b61885f503002dd8698de32df504b0e8de93a627d89afb59f.png', preferRate: 78 },
      { name: '아첼레란도', description: '루시우의 가속 음악이 활성화되어 있는 동안 공격 속도가 15% 증가하고, 볼륨을 높여라!를 시전 중일 땐 3배 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/c932c84f75d245fb1308f918d80e6a0a9ba93004e40f27e55d63016bd29fb340.png', preferRate: 22 },
    ],
  },
  'mauga': {
    minor: [
      { name: '키네틱 탄띠', description: '돌파로 돌진 중 첫 1초 동안 최대 150발의 탄약을 재장전합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/6adca5324793138777cdd09152168778785188b1d32962e42df933638ab49321.png', preferRate: 19 },
      { name: '방화광', description: '화염 기관포로 적에게 불을 붙이면 50의 추가 생명력을 얻습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/3b22a3f8c185339e203c006abf3b40ef16074f8439855dcd27ecbf3779f46792.png', preferRate: 81 },
    ],
    major: [
      { name: '불 위를 걷는 자', description: '돌파에 적중당한 적이 불탑니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/83b13a8976492b76d22ef89abd6815e90fcc7f3133853d86a9e898bc07db8c5a.png', preferRate: 68 },
      { name: '전투 연료', description: '공격이 치명타로 적중하면 다음 터질 듯한 심장 사용 시 마우가가 일시적으로 추가 생명력을 4 얻습니다. 최대 150까지 얻을 수 있습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/69aae6d3636721510e30bc9d1578944c8e9705ab403d9e421798aceebf0f1a9b.png', preferRate: 32 },
    ],
  },
  'mei': {
    minor: [
      { name: '스케이트장', description: '눈보라 내에 있는 아군의 이동 속도가 25% 증가하고, 생명력이 초당 50 치유됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/10f6bf7a34140e74cf639ae596ccaaf4a84d2850f7b4058662a922ce45c58515.png', preferRate: 24 },
      { name: '빙하 추진력', description: '2단 점프를 하면 메이를 공중으로 띄우는 작은 얼음 기둥이 생성됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/55f25d042e203d5c4fb858df4caadd51875b51d7344e0c7e49427eaf64c61229.png', preferRate: 76 },
    ],
    major: [
      { name: '냉대', description: '기본 발사로 적을 계속 공격하면 적을 짧은 시간 동안 얼립니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/e6241c9fb1a5cfd31085dd1a5ab417a6ad29904d75989f7718aa417b390126e6.png', preferRate: 68 },
      { name: '급속 폭풍', description: '급속 빙결이 주위 적들을 느려지게 하고 초당 70의 피해를 줍니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/6d0f58c3d4df90c6562b381a584da6608beef0826e03d34a0bcf7b964afaff3a.png', preferRate: 32 },
    ],
  },
  'mercy': {
    minor: [
      { name: '천사의 부활', description: '메르시가 부활을 시전한 후 100의 추가 생명력을 얻습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/39c6fcef8a4380d73f7714d7276c6559bc25547d0c090631d603d05ed4d6620e.png', preferRate: 40 },
      { name: '날개의 영역', description: '수호천사의 사거리가 30% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/77e68b4b2cdab6bdbb2509b8dcaf964cbbaffa14523b72d1fe512abc87f3576f.png', preferRate: 60 },
    ],
    major: [
      { name: '연쇄 증폭', description: '카두세우스 지팡이의 공격력 증폭 효과가 5% 증가하고 근처의 두 번째 아군에게 연결됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/48d23bc9eebad7092ef2b1895abc99ff1f4207a1ac423a88b8418b388f10f4eb.png', preferRate: 65 },
      { name: '두 배 투여', description: '빠른 치유 충전 횟수가 1회 증가하지만, 기본 치유량이 10 감소합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/e0887d16a296e6419cf0e8a32ed74ceea31bd96efbd25576511516ba0339c870.png', preferRate: 35 },
    ],
  },
  'mizuki': {
    minor: [
      { name: '샘물', description: '회복 오라 재생량이 25% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/65dc63c40f3f40290ad291f9dda4f981e4cf9980b676946d1b145336b4aa1858.png', preferRate: 31 },
      { name: '드러난 영혼', description: '속박 사슬이 적에게 적중하면 2초 동안 해당 적에게 주는 피해가 30% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/44773ab19e89d3732249176897c44c9164c5099e5c8e29599255ba3cc3e29f62.png', preferRate: 69 },
    ],
    major: [
      { name: '공명 복귀', description: '치유의 삿갓이 한 번 더 튕깁니다. 튕길 때마다 치유량이 10 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/f87c6cc1b61157dc4d40cac191544a3ebfa2c0a44b956e8526e6bf6eef6d5351.png', preferRate: 56 },
      { name: '잰걸음', description: '종이 인형 분신술을 사용 중일 때, 회복 오라 내에 있는 아군의 이동 속도가 20% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/d29b3404035091c9429058c468bef3b7cd9299a366e8fa203ef343177db586bd.png', preferRate: 44 },
    ],
  },
  'moira': {
    minor: [
      { name: '파괴의 분할', description: '융화를 순수 치유와 순수 공격 간 전환할 수 있습니다. 효과가 30% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/5278bcb65c1456dde7bf000c52953a6f08dfff2264bff6b81e70a1879340804b.png', preferRate: 18 },
      { name: '윤리적 양분 보충', description: '생체 구슬이 접촉하는 각 아군의 생명력을 30만큼 즉시 치유합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/f2da4eb4ebcd69bfc9a7f7b9be13e9b4aa80ba4828e9b6406c97b3e032de4690.png', preferRate: 82 },
    ],
    major: [
      { name: '반전', description: '생체 구슬을 다시 활성화하면 방향이 반전됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/202e75ee3c419f82f8557cd12864995d583faded5f6654b043372fd42d4206a7.png', preferRate: 24 },
      { name: '환영 걸음', description: '소멸의 지속 시간이 0.5초 더 길어지고 점프 높이가 50% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/6d3b8b3719ce56537a1279e91318980d66752490946799643bd5226987115ed6.png', preferRate: 76 },
    ],
  },
  'orisa': {
    minor: [
      { name: '방어 프로토콜', description: '대지의 창을 충전하는 동안 생명력이 초당 100 재생됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/319851240bac7253ea1601534c66860a126c2f6a9bd6af56bdb25265c3521fe0.png', preferRate: 19 },
      { name: '이동식 강화', description: '방어 강화가 활성화된 동안 오리사는 이동 속도가 감소되지 않고 열을 생성하지 않습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/02ffaf6f362417f64e8bd50919d2d2d5d9238c2f9a7e168b3d68192c4c604004.png', preferRate: 81 },
    ],
    major: [
      { name: '묵직한 투창', description: '투창의 밀쳐내는 효과가 25% 증가하고 벽 충돌 피해가 15 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/bcfd342643f783df7b6710fd613f2a2a7fc4e84d33e2d2235f203e8e6c6e58ea.png', preferRate: 83 },
      { name: '보호 방벽', description: '수호의 창 대신 방벽을 발사합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/88b6e3613c49bf6c6edbd2e32fb8aaa71ba58d556ff0d6403688d1ceabc70f31.png', preferRate: 17 },
    ],
  },
  'pharah': {
    minor: [
      { name: '충격력', description: '충격탄이 최대 30의 폭발 피해를 줍니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/f539cb6ea0b24ef0edd895d2d734d3fb2bc85345c1c5371c5987f92e784eb82e.png', preferRate: 72 },
      { name: '나선 보호막', description: '생명력 125를 보호막으로 전환합니다. 로켓 런처로 직격타 시 보호막 재생 지속 능력이 활성화됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/4136731c24d8b49678a8a9def5f5d3e5f7e3c5897cd9c151c1409dbdead93f71.png', preferRate: 28 },
    ],
    major: [
      { name: '연료 저장', description: '급속 추진이 연료를 50% 제공합니다. 최대 추가 연료량이 100% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/1b28fe153dc36c6b379ff6793420d280d5ce16bb855188cd35b6f078393cb134.png', preferRate: 12 },
      { name: '로켓 투하', description: '이동 기술 사용 후, 다음 기본 발사가 나선형으로 상승하는 초소형 로켓 2발을 함께 발사합니다. 각 로켓은 폭발하며 30의 피해를 줍니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/34efa97b9ef729fabe003953ca7e5e33e23d07c07c37aee8a6ffa4c5a88cf6bd.png', preferRate: 88 },
    ],
  },
  'ramattra': {
    minor: [
      { name: '맹공 형태', description: '네메시스 형태가 활성화된 동안 처치 시 지속 시간이 2초 연장됩니다. 절멸 중에는 그 절반만 연장됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/8671fcad5ba90ab73fe1c01d831801d5ecac6f9b75bf1bbabde065d2277dc4de.png', preferRate: 23 },
      { name: '연장된 방벽', description: '공허 방벽의 크기와 지속 시간이 25% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/b94428b88e5858d65ac4a0f9800c344ecd11c9f31698d42d55a9f3ab4df241cb.png', preferRate: 77 },
    ],
    major: [
      { name: '공허 쇄도', description: '공허 가속기를 연속 발사하는 동안 주기적으로 6발의 추가 투사체를 방출합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/8c4ab35a42b172b78cc2124f5c6098e1da757ff31c2c73e51d45c43b0b382bb2.png', preferRate: 75 },
      { name: '나노머신 수리', description: '라마트라가 탐식의 소용돌이 안에 있는 동안 매초 100의 생명력을 회복합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/0f01814ad4c072dbbaddb1f15e72178f6bb5e7bc2c0eb3874c9f5838f98e30e7.png', preferRate: 25 },
    ],
  },
  'reaper': {
    minor: [
      { name: '영혼 강탈자', description: '사망한 적에게서 영혼 구슬을 수집하면 50의 생명력을 회복합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/703054950487245c1a60a25bf65e8301d6050559e5216c17f4970c1adc46fd0b.png', preferRate: 30 },
      { name: '잔존하는 망령', description: '망령화를 종료하면 2초 동안 이동 속도가 30% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/6fe85e04ebeacfca484fbd776da1bf7935102577c30a5d9e9b12ad7e859cc415.png', preferRate: 70 },
    ],
    major: [
      { name: '그림자 점멸', description: '그림자 밟기의 시전 시간과 재사용 대기시간 회복이 25% 빨라지지만, 사거리가 25% 감소합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/ad2d66c3c90bb3b92e262998d99f3ff30cc9b917205339cb59a4e13f8e23fa33.png', preferRate: 40 },
      { name: '방아쇠 손가락', description: '기술을 사용하거나 총을 재장전할 때마다 긴박한 방아쇠의 재사용 대기시간이 초기화됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/668cd4b407c22f66b8c0f703c352293542dce4d6e0535efd2fb4f2123ff8ed1a.png', preferRate: 60 },
    ],
  },
  'reinhardt': {
    minor: [
      { name: '성전사의 화염', description: '적을 기절시키면 화염 강타 충전 1회를 돌려받습니다. 최대 3회까지 추가 충전됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/c52c47ea96e1485d5eefb4b968b8ddd3c85705023f9696f4d5ea9c70887e060f.png', preferRate: 23 },
      { name: '성전사의 결의', description: '방벽 방패 사용 중 생명력 지속 재생이 75% 빠르게 발동합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/c5b0de9c882813ed237ae4822f9059b9c496f5b249ceeb79fdb2fbc4cff05e07.png', preferRate: 77 },
    ],
    major: [
      { name: '방패 강타', description: '방벽 방패가 활성화되어 있는 동안  사용 시 적에게 피해를 주고 밀쳐냅니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/f439f368062a58b9ee190afb5d4ea3ad28692d298600292f1f47e6e68151d108.png', preferRate: 52 },
      { name: '불붙은 분노', description: '화염 강타가 적에게 적중할 때마다 2초 동안 공격 속도가 25% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/543ee152a75898b667a5c0a0127326b36716df02b6e2baace4bb0d9784571c6a.png', preferRate: 48 },
    ],
  },
  'roadhog': {
    minor: [
      { name: '고철 갈고리', description: '사슬 갈고리 명중 시 탄약을 2발 재장전합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/2ca8a50b6b369d47a33ec5d4a3e42e12ca1aebb8144a29d959a134fb4226934a.png', preferRate: 71 },
      { name: '파편 발사기', description: '고철총 보조 발사의 사거리가 50% 늘어나고 탄 퍼짐이 25% 줄어듭니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/d48d0b264d765e3732abda784e986595f7a6c5ad0e56f1929c008ffc0492a39d.png', preferRate: 29 },
    ],
    major: [
      { name: '호그가스 노출', description: '숨 돌리기 사용 시 주위의 아군을 치유량의 50%만큼 치유합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/bbeb9d0110d04466eda5f4a845bd27685f80703264c967c0cf224f1b99d6f49d.png', preferRate: 72 },
      { name: '풀드포크', description: '사슬 갈고리로 적을 끌어당긴 거리에 비례해 최대 300의 추가 생명력을 얻습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/db9a0129262448dad0c5f70558b561d77b40c9bc721c0cae1dd75a7ed647d4b7.png', preferRate: 28 },
    ],
  },
  'shion': {
    minor: [
      { name: '신속 재장전', description: '피하기 시 탄약 9발을 재장전합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/89b16eb9226b933934040d80842d3bf395e058d7bfebc98f71250ddfcd86e2a4.png', preferRate: 11 },
      { name: 'X 마키나', description: '처형이 생명력이 절반 미만인 적에게 20% 추가 피해를 줍니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/7d496f8a59eb6f13d661bc282be234e96a683862347777ec7281a92516b8bb1c.png', preferRate: 89 },
    ],
    major: [
      { name: '재급유', description: '조이라이드가 생명력 50을 즉시 회복시키고 활성화되어 있는 동안 생명력을 초당 20씩 재생합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/ef825e7cd91405f38bb5e0400b9d20162a01fa81e726d574528a0d3ef3812abc.png', preferRate: 33 },
      { name: '죽음의 얼굴', description: '다른 모든 공격 하위 역할 지속 능력을 획득합니다(수색가, 전문가, 명사수).', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/60e45c630f647bf5b254bb31b02c2597b8d7ace1e7444b05357b694dac3a1d54.png', preferRate: 67 },
    ],
  },
  'sierra': {
    minor: [
      { name: '전력 비행', description: '앵커 드론의 비행 및 갈고리 범위가 25% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/87310bf39feb0d3fb4d672e3f4a78a212c678971301fc33abc5bf619431474f9.png', preferRate: 19 },
      { name: '단단한 손아귀', description: '헬릭스 소총 집탄율이 70% 빨리 좁혀지고 30% 느리게 넓어집니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/b61cf59f034272059a12bc580f5554c80cada3d3efb58bd2a50b6422f8dd228f.png', preferRate: 81 },
    ],
    major: [
      { name: '의료 드론', description: '앵커 드론에 시에라를 치유하는 생명력 팩이 탑재됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/40bee6462dc1424e2a7b0edf20ed84689f3ea5729d41377187a257982524e818.png', preferRate: 10 },
      { name: '대상 포착', description: '추적 사격이 적에게 적중하면 2초 동안 공격 속도가 20% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/656d1dee1ba31c2433d36512c973f0958231dae8dcfc70226c16497819ddc65f.png', preferRate: 90 },
    ],
  },
  'sigma': {
    minor: [
      { name: '키네틱 순환', description: '키네틱 손아귀로 투사체 흡수 시 강착의 재사용 대기시간이 감소합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/f22dbfb1aaeff73f2fea11906bf431b2063f68160ba54473337c24a8d01cc524.png', preferRate: 17 },
      { name: '초재생', description: '초구체로 준 피해의 30%만큼 실험용 방벽의 내구도가 회복됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/a6f10bff0408ce201f848449e2ae55ae8b2f368b42165090922b08854a90cb86.png', preferRate: 83 },
    ],
    major: [
      { name: '하이퍼 강타', description: '초구체가 5회 명중할 때마다 다음 빠른 근접 공격이 적중한 적을 공중에 띄우고 멀리 밀쳐냅니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/f5bbae6e666458d5d8a382c67056ea3cf0ce0781d575c540a6afb58267e92027.png', preferRate: 47 },
      { name: '공중 부양', description: '공중에서 점프를 길게 누르면 잠시 더 높이 떠오릅니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/15828d0a39a88da3687e84e52a1a119fb0b5b08812e11c356bfffb8fe90d8a41.png', preferRate: 53 },
    ],
  },
  'sojourn': {
    minor: [
      { name: '과충전', description: '오버클럭이 활성화되어 있을 때 레일건의 최대 에너지가 50 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/5e3658d0e7ce5ab2941fad17e8201fc2f658db8554d7f83c114bafcbc54740b8.png', preferRate: 59 },
      { name: '감속장', description: '분열 사격에 적중당한 적이 25% 둔화됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/f9a050171b880b1cba0411bfd11eb0739f3d06bf579dd5f3e9cfc9ed767d05e5.png', preferRate: 41 },
    ],
    major: [
      { name: '마찰 생성기', description: '파워 슬라이드가 최대 75의 에너지를 생성합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/26003dd94835d340f1045db8be6b5342b23790e73bb13d258748d6fe86af8a8e.png', preferRate: 25 },
      { name: '이중 추진기', description: '파워 슬라이드가 충전 횟수가 1 증가하고, 점프 시 횡방향으로 이동할 수 있습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/78ec26ed402e4ea8a1a2cafcbab9759f35886d3d529c7fa653527cd554f2ed9f.png', preferRate: 75 },
    ],
  },
  'soldier-76': {
    minor: [
      { name: '나선 추진', description: '나선 로켓의 투사체 속도가 50% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/f3edf6d186c45e6e380ea7402199287e9724390b8b48f6702687ab6f18f47655.png', preferRate: 78 },
      { name: '전술 일제 사격', description: '전술 조준경 사용 중, 나선 로켓의 재사용 대기시간이 80% 감소하며 펄스 소총 발사를 중단하지 않습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/c2b0f0b31aa7064f89843efe9f3d4a1ed47b235e9727a925b8a268c6981ddf57.png', preferRate: 22 },
    ],
    major: [
      { name: '전속력', description: '질주의 이동 속도 보너스가 2초 동안 점진적으로 25% 추가로 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/062d822ee3836054bd987c73831c74c87f9e18ce74b7ceec14e0450d582aa524.png', preferRate: 20 },
      { name: '전투자극제', description: '전투자극제가 생체장을 대체합니다. 사용 시, 5초 동안 솔저: 76의 생명력이 초당 30 치유되고 공격 속도가 20% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/534498771c3a5a981a3d3f8c2f55df2998753e791f2fd77b51ac95fe501edafd.png', preferRate: 80 },
    ],
  },
  'sombra': {
    minor: [
      { name: '암호화 업로드', description: '투명화 중에 해킹을 사용할 수 있으며, 해킹에 성공하면 은신의 지속 시간이 3초 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/282c6799d179564162500a2baff9dd78add8c67aab0142ae4164f7da39a95acb.png', preferRate: 23 },
      { name: 'CTRL ALT ESC', description: '생명력이 절반 미만일 때 위치변환기로 순간이동하면 지속 생명력 재생이 시작됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/b6d526c6b4a6dc8af1266bafb5dca4e649754e3ad4ffd8b7338601f40adb0b87.png', preferRate: 77 },
    ],
    major: [
      { name: '고속 대역폭', description: '해킹한 생명력 팩이 4초 동안 아군의 이동 속도를 25% 증가시키고 50의 추가 생명력을 부여합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/74aaa7eed6e3eda7d9336006455230e43c769500027b95e68062ddf836a237ab.png', preferRate: 16 },
      { name: '바이러스 복제', description: '해킹한 적을 바이러스로 공격하면 바이러스가 8미터 이내의 적에게 퍼집니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/f07dadc22d6b469a372f58031769729390acbcbd3541d0d4f9f69b98153b5b25.png', preferRate: 84 },
    ],
  },
  'symmetra': {
    minor: [
      { name: '포탑 용량', description: '감시 포탑 충전 횟수가 1 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/4e1fb364d87d9e78b9103b2bac3b553f743fd44a1bb5170aaae128fe4d79eac5.png', preferRate: 20 },
      { name: '완벽한 정렬', description: '광자 발사기 기본 발사 사거리가 20% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/b36193e986b8e815b07ebf01a85bc2c29a1cd34c2ee50c458f7d07d933b4a0d8.png', preferRate: 80 },
    ],
    major: [
      { name: '호버 방벽', description: '순간이동기에 전방으로 움직이는 방벽을 생성하는 선택지가 생깁니다. E 키를 다시 누르면 방벽의 이동 속도가 느려집니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/674c0286e244b391dbda20695dfb4ed08c9ab7265741c91be4549f7fcbf4d3a7.png', preferRate: 18 },
      { name: '보호막 배터리', description: '시메트라가 순간이동기로부터 10미터 이내에 있는 동안 매초 보호막을 20 재생합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/2bec4e3cd61b5516075b478abdb34676bd458579ab1764699a1ab106a1dbaefb.png', preferRate: 82 },
    ],
  },
  'torbjorn': {
    minor: [
      { name: '망치질 개시', description: '대장간 망치를 장착한 동안 이동 속도가 20% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/d60050f7eff6fa99e2914cceacd5fcc2e5bec6b1c898155246743d51be4bebc4.png', preferRate: 38 },
      { name: '예열 완료', description: '초고열 용광로가 과부하를 활성화합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/510847cb9a3e297cea8bdab984e2589cc30f72dd611899b26409dbb5fe8a84fd.png', preferRate: 62 },
    ],
    major: [
      { name: '고정 나사', description: '포탑 설치의 투척 거리가 50% 증가합니다. 이제 포탑을 벽이나 천장에 설치할 수 있습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/5f3ae1fcd2f9a78ae44293324d53c8cd9273b42cf9be0d56ff920ee5f45c589d.png', preferRate: 81 },
      { name: '포탑 과부하', description: '과부하가 5초 동안 내 포탑을 업그레이드하여 생명력과 피해를 증가시킵니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/c6eb6f52be58ddb12bf57b744d374f00871fd0068345e61b0c962eb04c0901b5.png', preferRate: 19 },
    ],
  },
  'tracer': {
    minor: [
      { name: '시간적 재생', description: '생명력 지속 재생이 50% 빠르게 발동합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/abd0ec9faa55dabce39858b243817ae53ac30baf210f7c2214768b60806d9dae.png', preferRate: 53 },
      { name: '키네틱 재장전', description: '근접 공격 적중 시 탄약을 12발 재장전합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/0f73a044de1866a093ccb2e7e368a730387936eae6cb18274b4dbafed26fa0fe.png', preferRate: 47 },
    ],
    major: [
      { name: '점멸 팩', description: '생명력 팩이 점멸을 1회 충전시킵니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/de00cd532bf045c7d4e242d01944723f724f2eaa6f8df8a44769450d8f49b0d3.png', preferRate: 36 },
      { name: '양자 얽힘', description: '시간 역행이 점차 사라지는 추가 생명력 50과 탄약 20발을 부여합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/ace0ed5106148847a2b2f4dfcee58b883ed38bb2851ccbd106528f4ddea6cf41.png', preferRate: 64 },
    ],
  },
  'vendetta': {
    minor: [
      { name: '추가 칼날', description: '칼날 투영의 에너지 비용이 25% 감소합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/e970c9fa76693e93f3f490fdfd46efd56ba6a603d9b9169daa32b4b9a9cae1e8.png', preferRate: 33 },
      { name: '맹렬한 폭풍', description: '소용돌이 질주 사용 시 계속 회전하여 추가로 3회 공격해 넓은 범위에 30의 피해를 줍니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/954fc7de0d9e63b963e255eb433ceba0a8fe7af235e93023bbc2788decec218e.png', preferRate: 67 },
    ],
    major: [
      { name: '착취의 강타', description: '내리치기가 40%의 생명력 흡수 효과를 얻습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/2f56f724364510363723ecace47dd3d08358146b1d689dca22fe1040c7f61705.png', preferRate: 86 },
      { name: '무자비', description: '맹공이 추가로 3번 중첩되며, 중첩 하나당 공격 속도가 5%, 이동 속도는 3% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/6f16af6f1ddffb07db1c5885caf9ed63754c025d0ad7d0be09d7b45908fad80e.png', preferRate: 14 },
    ],
  },
  'venture': {
    minor: [
      { name: '심층 잠복', description: '잠복 상태에서 드릴 돌진의 거리가 75% 길어집니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/74c79013c0286944d1b98298ed164d3d7d8f8c4248c3369af265fecadb7154b1.png', preferRate: 31 },
      { name: '발굴의 쾌감', description: '지각 충격이 활성화되어 있는 동안 재사용 대기시간이 300% 빠르게 충전됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/d960ab39306289f689d7796d9ed40bc638e5ff8179c48be8cc6f7fa8a5b22497.png', preferRate: 69 },
    ],
    major: [
      { name: '스마트 연장기', description: 'E 키로 스마트 굴착기를 강화하여 4초 동안 최대 투사체 사거리를 100% 증가시킵니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/8d8769f9aedd55622b1c994ae8cf7cddefbc66a55e0b33bbb4f07b2de7220e15.png', preferRate: 74 },
      { name: '먼지투성이', description: '갈아 버리기로 피해를 주면 굳센 탐험가 보호막이 최대 40 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/bd3a6e0335e5c643bac274f1c7e6920712eb2844d2ef60e19434f1841990a238.png', preferRate: 26 },
    ],
  },
  'widowmaker': {
    minor: [
      { name: '저격 효율', description: '저격 모드의 탄환 소모량이 5발에서 3발로 감소합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/7b4791cbfcc18876850b21a4c555d150081fa4689e9b489d6291bee40e0d8e9e.png', preferRate: 77 },
      { name: '저격수의 본능', description: '갈고리 발사를 사용한 후 2초 동안 저격 모드가 100% 빨리 충전됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/c7788454504da63392a16b1cee6c2edc3675eb4520c0c6e08fb2543c289648b2.png', preferRate: 23 },
    ],
    major: [
      { name: '추적 지뢰', description: '맹독 지뢰가 10미터 이내의 적에게 독을 발사하며 발동된 후에도 사라지지 않고 유지됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/24e57c5145c859408f311fd13ca239da270c9258f0749e6e302a3ecdbdfb9044.png', preferRate: 9 },
      { name: '위도우의 독니', description: '저격이 최대 125%까지 충전되며, 완충 시 적을 관통합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/0643cb690b369b1c2bcaab485ea20113ad629755c37bf2e14b7beb9b470cddba.png', preferRate: 91 },
    ],
  },
  'winston': {
    minor: [
      { name: '전하', description: '테슬라 캐논의 기본 발사로 피해를 준 적 하나당 윈스턴의 이동 속도가 10% 증가합니다(최대 30%).', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/cd3ce407e3817830cf930bdf156b96669a9d811f73a2ed9cd421e6b27b64cc9c.png', preferRate: 79 },
      { name: '묵직한 착륙', description: '원시의 분노 시전 중 공중에서 점프 팩의 피해량과 범위가 최대 75 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/e75d5742d239f04d14979fee4015ecd173b21786324b88739721b1b75db500fa.png', preferRate: 21 },
    ],
    major: [
      { name: '연쇄 번개', description: '완전히 충전된 보조 발사가 명중하면 튕겨 나와 최대 2명의 대상에게 추가로 피해를 줍니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/07057b7cb8a72dfe55a0880562ab4afbe9a056e226e19c3c1ae6e2fa88d59c14.png', preferRate: 20 },
      { name: '활력 충전 방벽', description: '방벽 생성기가 내부에 있는 아군의 생명력을 초당 35 치유합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/92c7620c5f92eb1eabb51b9ffeeab93e6be9e0966e7981b3cf515f3fe6ae27ae.png', preferRate: 80 },
    ],
  },
  'wrecking-ball': {
    minor: [
      { name: '증기 롤러', description: '구르기가 돌격 영웅에게 적중 시 100% 추가 피해를 줍니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/61ba1ca38638f3d83c7feaf3370ae8040c72bc49e77bad42a311d36031363155.png', preferRate: 38 },
      { name: '멀티볼', description: '지뢰밭 사용 후 5초 이내에 Q 키를 누르면 지뢰 7개를 추가로 뿌립니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/e542dc40c07eeb35f2c0c4c01e30357c408a8d343c14d6b177e6a904644a2a18.png', preferRate: 62 },
    ],
    major: [
      { name: '체공 시간', description: '파일드라이버가 더 오래 시전되며 공중에서 방향 조작이 가능해지고 50%의 추가 피해를 줍니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/3647153c08c0af7933fa49fff4669ff44db4fb20aa893a047307c08da5288115.png', preferRate: 19 },
      { name: '적응형 방벽', description: '적응형 보호막 활성화 시, 1.5초간 유지되는 방벽을 생성합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/91c944d1e02f4bf1619b3b2f81d4af774a08c61d2974ee956e501dfc21a20f41.png', preferRate: 81 },
    ],
  },
  'wuyang': {
    minor: [
      { name: '범람', description: '격류를 활성화하고 있는 동안 탄약을 10발 얻고 치유 자원이 50% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/4159af4f1e6cb3fa0879727deec0d07d151a8b96e883b4b2e13ab570d840d514.png', preferRate: 28 },
      { name: '균형', description: '물의 구슬로 피해를 주면 회복의 물결 지속 치유량이 2초 동안 30% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/0ef4ae1adde715d22a18b57810ede98b0ed61b649d71364b0077ffe3dbb965fc.png', preferRate: 72 },
    ],
    major: [
      { name: '밀물과 썰물', description: '수호의 파도가 시작 위치로 다시 밀려갑니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/ce177940cb80eb007a9b845861407335caf18048affe226b1e2c39b4a01c6b22.png', preferRate: 24 },
      { name: '쏟아지는 비', description: '피해가 60% 감소하고 강화 폭발 반경이 25% 감소한 물의 구슬 3개를 동시에 제어합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/b4b736a801ab836d8c66825bb8dfc7051333b54f42406ef79520c11d43159a7a.png', preferRate: 76 },
    ],
  },
  'zarya': {
    minor: [
      { name: '점프 소동', description: '보조 발사로 자신을 밀쳐내는 거리가 75% 증가합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/a1c471e92b4c70a11e2ad276fcc7589f653ae06cdfb0e38967a4593653866de6.png', preferRate: 21 },
      { name: '지원 관찰', description: '방벽 씌우기가 아군의 생명력 재생을 활성화시키고 이동 속도를 20% 증가시킵니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/198c67146cb8a79d7584fab1a0762bc9bba2f37e24852bf716dc9587acffecbc.png', preferRate: 79 },
    ],
    major: [
      { name: '출력 증폭', description: '방벽이 활성화되어 있을 때 입자포 광선으로 피해를 주면 에너지를 생성합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/e1327b5d6c493bf9a2b89e7c6a0e68d6fbb5f5dd3f1291b648534ddb68f2dc44.png', preferRate: 84 },
      { name: '에너지 장창', description: '입자포 광선이 적을 관통합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/7592ce85cb4ce0f6bc90aeca6da706a2e73dcc42f31372553c8fa44c501931ea.png', preferRate: 16 },
    ],
  },
  'zenyatta': {
    minor: [
      { name: '부조화의 수리', description: '젠야타가 부조화의 구슬이 적용된 적으로부터 15%의 생명력 흡수를 얻습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/9f317bc17cfa00574118e7a32fe2853e0a9a6fe71abcdae996dabacd58b3adf2.png', preferRate: 41 },
      { name: '승천', description: '공중에서 점프를 길게 누르면 최대 3초까지 떠오른 상태를 유지합니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/54dffa6e3725551b4c14147386ed29351e495f2571401dbfc9e51034764025c5.png', preferRate: 59 },
    ],
    major: [
      { name: '파괴 집중', description: '보조 발사가 20% 빠르게 충전되며 파괴의 구슬 하나를 추가로 충전할 수 있습니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/95348852bb0e41f8e9dd66917be4d89f9536daa7afa660c9212dc3fd3ca5826e.png', preferRate: 40 },
      { name: '이중 조화', description: '두 번째 조화의 구슬을 얻지만, 두 구슬의 치유 효과가 70%가 됩니다.', icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/9898f52ec09a2846050183112728e3baa06bd46061897644db6423f357486628.png', preferRate: 60 },
    ],
  },
};
