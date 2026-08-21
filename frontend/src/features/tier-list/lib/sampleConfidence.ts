import { LOW_SAMPLE_PICK_RATE_THRESHOLD } from '../data/tierList';

export type SampleConfidence = 'sufficient' | 'caution' | 'low';

// 출처가 실제 표본 수(경기 수)를 공개하지 않아, 픽률을 대리 지표로 3단계 신뢰도를 매긴다.
// low 기준은 기존 LOW_SAMPLE_PICK_RATE_THRESHOLD(3%)를 그대로 재사용한다.
const CAUTION_PICK_RATE_THRESHOLD = 5;

export function getSampleConfidence(pickRate: number): SampleConfidence {
  if (pickRate < LOW_SAMPLE_PICK_RATE_THRESHOLD) return 'low';
  if (pickRate < CAUTION_PICK_RATE_THRESHOLD) return 'caution';
  return 'sufficient';
}
