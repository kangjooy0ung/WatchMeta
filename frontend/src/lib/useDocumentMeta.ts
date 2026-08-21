import { useEffect } from 'react';

const SITE_URL = 'https://watchmeta.vercel.app';

interface DocumentMetaOptions {
  title: string;
  description?: string;
  path?: string;
  // 배틀태그별 프로필처럼 무한히 생성되고 검색 가치가 낮은(+ 공개 여부가 사용자 설정에 달린) 페이지는
  // 색인에서 제외한다. 메타 티어리스트처럼 유한하고 유용한 페이지는 기본값(색인 허용)을 그대로 쓴다.
  noIndex?: boolean;
}

function setMetaTag(name: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

// react-helmet 같은 라이브러리 없이, 라우트별로 <title>/description/canonical만 갱신한다.
// SPA라 소셜 링크 미리보기(카카오톡·디스코드 등)는 JS를 실행하지 않아 이 값을 못 읽지만,
// 브라우저 탭 제목·방문 기록, 그리고 JS를 실행하는 구글 크롤러의 색인에는 도움이 된다.
export function useDocumentMeta({ title, description, path, noIndex = false }: DocumentMetaOptions) {
  useEffect(() => {
    document.title = title;
    if (description) setMetaTag('description', description);
    setMetaTag('robots', noIndex ? 'noindex, follow' : 'index, follow');
    setCanonical(`${SITE_URL}${path ?? window.location.pathname}`);
  }, [title, description, path, noIndex]);
}
