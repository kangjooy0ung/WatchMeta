import { BrowserRouter } from 'react-router-dom';
import { BottomTabBar } from '../components/layout/BottomTabBar';
import { Footer } from '../components/layout/Footer';
import { TopNavBar } from '../components/layout/TopNavBar';
import { AppRouter } from './router';
import { QueryProvider } from './providers/QueryProvider';

export function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
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
