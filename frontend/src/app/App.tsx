import { BrowserRouter } from 'react-router-dom';
import { BottomTabBar } from '../components/layout/BottomTabBar';
import { TopNavBar } from '../components/layout/TopNavBar';
import { AppRouter } from './router';
import { QueryProvider } from './providers/QueryProvider';

export function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <TopNavBar />
        <div className="pt-16">
          <AppRouter />
        </div>
        <BottomTabBar />
      </BrowserRouter>
    </QueryProvider>
  );
}
