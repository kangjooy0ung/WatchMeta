import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const GITHUB_REPO_URL = 'https://github.com/kangjooy0ung/WatchMeta';

export function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-dim px-4 pb-[calc(5rem+env(safe-area-inset-bottom))] pt-6 text-on-surface-variant md:pb-8 md:px-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3">
        <span className="font-headline-md text-headline-md italic tracking-tighter text-primary">WATCHMETA</span>

        <nav className="flex flex-wrap gap-4 text-sm">
          <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer" className="hover:text-on-surface">
            소개
          </a>
          <Link to={ROUTES.privacyPolicy} className="hover:text-on-surface">
            개인정보처리방침
          </Link>
          <a href={`${GITHUB_REPO_URL}/issues`} target="_blank" rel="noreferrer" className="hover:text-on-surface">
            문의
          </a>
        </nav>

        <p className="max-w-3xl text-xs leading-relaxed text-on-surface-variant/70">
          WatchMeta는 블리자드 엔터테인먼트(Blizzard Entertainment)의 보증을 받은 사이트가 아니며, 오버워치
          제작·운영에 공식적으로 관여하는 어떤 곳의 입장도 대변하지 않습니다. 오버워치 및 관련 명칭은 블리자드
          엔터테인먼트의 상표입니다. Overwatch © Blizzard Entertainment, Inc.
        </p>
      </div>
    </footer>
  );
}
