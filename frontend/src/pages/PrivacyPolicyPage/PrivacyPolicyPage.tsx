import { ROUTES } from '../../constants/routes';
import { useDocumentMeta } from '../../lib/useDocumentMeta';

export function PrivacyPolicyPage() {
  useDocumentMeta({ title: '개인정보처리방침 | WatchMeta', path: ROUTES.privacyPolicy });
  return (
    <div className="bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] text-on-background">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 pt-6 lg:px-8">
        <h1 className="font-headline-lg text-headline-md italic text-primary">개인정보처리방침</h1>

        <div className="space-y-4 text-sm leading-relaxed text-on-surface-variant">
          <p>
            WatchMeta(이하 &apos;사이트&apos;)는 오버워치 플레이어의 공개 전적과 메타 티어표를 보여주는 비공식
            사이트입니다. 별도의 회원가입이나 로그인 기능은 없으며, 아래와 같은 방식으로만 데이터를 다룹니다.
          </p>

          <section className="space-y-1.5">
            <h2 className="font-headline-md text-base italic text-on-surface">1. 배틀태그/전적 검색</h2>
            <p>
              검색창에 입력한 닉네임은 서버를 거쳐 공개 데이터 제공처(OverFast API, 블리자드 공식 통계 페이지
              기반)에 전달되어 결과를 조회하는 데만 사용됩니다. 검색어나 조회 결과를 사이트 서버에 저장하지
              않습니다. &apos;공개&apos;로 설정된 프로필만 조회할 수 있습니다.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-headline-md text-base italic text-on-surface">2. 기기에 저장되는 정보</h2>
            <p>
              최근 검색 기록과 &apos;내 계정으로 저장&apos;한 프로필은 사용자의 브라우저(로컬 스토리지)에만
              저장됩니다. 사이트 서버로 전송되거나 다른 사용자와 공유되지 않으며, 브라우저 데이터를 지우면 함께
              삭제됩니다.
            </p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-headline-md text-base italic text-on-surface">3. 쿠키·광고·추적</h2>
            <p>현재 사이트는 방문자 추적 스크립트나 광고를 사용하지 않습니다. 변경 시 이 페이지에 반영합니다.</p>
          </section>

          <section className="space-y-1.5">
            <h2 className="font-headline-md text-base italic text-on-surface">4. 문의</h2>
            <p>
              개인정보 처리와 관련해 궁금한 점이 있다면 GitHub 저장소의 이슈로 남겨 주세요.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
