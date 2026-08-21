import { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { BottomTabBar } from '../components/layout/BottomTabBar';
import { Footer } from '../components/layout/Footer';
import { TopNavBar } from '../components/layout/TopNavBar';
import { AppRouter } from './router';
import { QueryProvider } from './providers/QueryProvider';

// 필터 변경 등 같은 페이지 안에서의 쿼리스트링 변화는 스크롤을 유지해야 자연스럽고,
// 실제 경로(pathname) 자체가 바뀌는 페이지 이동일 때만 스크롤을 최상단으로 되돌린다.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <ScrollToTop />
        <TopNavBar />
        <div className="flex min-h-screen flex-col pt-16">
          <div className="flex-1">
            <AppRouter />
          </div>
          <Footer />
        </div>
        <BottomTabBar />
      </BrowserRouter>
    </QueryProvider>
  );
}
