import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export function NotFoundPage() {
  return (
    <div>
      <p>페이지를 찾을 수 없어요.</p>
      <Link to={ROUTES.home}>홈으로 돌아가기</Link>
    </div>
  );
}
