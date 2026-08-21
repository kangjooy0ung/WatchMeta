import { useEffect, useRef, useState } from 'react';

// "실패로 간주하는 시간"과 "이미지를 실제로 요청하는 시점"을 반드시 함께 다뤄야 한다.
// 이전에 loading="lazy"만 걸어뒀을 땐 뷰포트 밖 이미지는 요청 자체가 미뤄지는데 타이머는
// 마운트 시점부터 돌아 오판했고, 그렇다고 lazy를 아예 빼면 티어리스트처럼 이미지 수십 개가
// 한 화면에 있을 때 전부 한꺼번에 요청이 몰려 일부가 응답 지연으로 실패 처리됐다.
// 그래서 뷰포트 근처(200px)에 들어왔을 때만 로드를 시작하고, 타이머도 그 시점부터 잰다.
const LOAD_TIMEOUT_MS = 8000;
const ROOT_MARGIN = '200px';

export function useDeferredImageLoad<T extends HTMLElement = HTMLDivElement>(src: string | undefined) {
  const containerRef = useRef<T>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [failed, setFailed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

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
    setFailed(false);
    if (!isNearViewport || !src) return undefined;
    timeoutRef.current = setTimeout(() => setFailed(true), LOAD_TIMEOUT_MS);
    return () => clearTimeout(timeoutRef.current);
  }, [isNearViewport, src]);

  const handleLoad = () => clearTimeout(timeoutRef.current);
  const handleError = () => {
    clearTimeout(timeoutRef.current);
    setFailed(true);
  };

  return {
    containerRef,
    shouldRenderImage: isNearViewport && !failed && Boolean(src),
    failed,
    handleLoad,
    handleError,
  };
}
