import { useParams } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';

export function HeroDetailPage() {
  const { heroId } = useParams<{ heroId: string }>();

  // TODO: 영웅 상세(상성/빌드) 데이터 연동 - Post-MVP
  return <PageContainer>{heroId} 상세</PageContainer>;
}
