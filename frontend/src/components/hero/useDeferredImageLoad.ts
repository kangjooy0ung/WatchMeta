import { useEffect, useRef, useState } from 'react';

// 뷰포트 근처(200px)에 들어왔을 때만 로드를 시작해, 티어리스트처럼 이미지 수십 개가 한 화면에
// 있을 때 전부 한꺼번에 요청이 몰리는 걸 막는다. 로드가 끝날 때까지는 대체 이니셜을 보여주되
// <img>는 계속 살려둔다 — 예전엔 일정 시간 뒤 <img>를 언마운트해 요청 자체를 취소해버려서,
// 응답이 살짝 느렸을 뿐인 이미지도 영영 대체 이니셜에 머무는 문제가 있었다.
const ROOT_MARGIN = '200px';

export function useDeferredImageLoad<T extends HTMLElement = HTMLDivElement>(src: string | undefined) {
  const containerRef = useRef<T>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || isNearViewport) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsNearViewport(true);
        }
      },
      { rootMargin: ROOT_MARGIN },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isNearViewport]);

  useEffect(() => {
    setIsLoaded(false);
    setFailed(false);
  }, [src]);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setFailed(true);

  return {
    containerRef,
    shouldRenderImage: isNearViewport && !failed && Boolean(src),
    isLoaded,
    handleLoad,
    handleError,
  };
}
