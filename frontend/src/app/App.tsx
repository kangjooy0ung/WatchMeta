import { BrowserRouter } from 'react-router-dom';
import { BottomTabBar } from '../components/layout/BottomTabBar';
import { AppRouter } from './router';
import { QueryProvider } from './providers/QueryProvider';

export function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <AppRouter />
        <BottomTabBar />
      </BrowserRouter>
    </QueryProvider>
  );
}
