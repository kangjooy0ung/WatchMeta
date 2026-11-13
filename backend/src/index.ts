import 'dotenv/config';
import { createApp } from './app.js';
import { getCompetitiveMaps } from './services/nexonMapStats.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = createApp();

app.listen(PORT, () => {
  console.log(`WatchMeta backend listening on http://localhost:${PORT}`);

  // 배포 환경(Render 무료 플랜)은 15분 놀면 잠들고, 깨어날 때마다 캐시가 비어 있다. 첫 방문자가
  // 그 비용을 떠안지 않게 기동 직후 전장 목록을 미리 받아둔다. 실패해도 평소 경로에서 다시
  // 시도하므로 로그만 남기고 넘어간다.
  void getCompetitiveMaps().catch((error: unknown) => {
    console.warn('전장 목록 예열 실패:', error instanceof Error ? error.message : error);
  });
});
