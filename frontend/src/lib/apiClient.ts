import axios from 'axios';

// API는 프론트와 같은 오리진의 /api (Vercel Functions)에 있다. 그래서 기본값이 '/api'다.
// 예전에는 별도 호스팅(Render)의 절대 주소를 VITE_API_BASE_URL로 받아 썼는데, 무료 플랜이
// 15분마다 잠들어 첫 요청이 20초 넘게 걸렸다. 같은 오리진으로 옮기면서 그 대기가 사라졌다.
//
// 환경 변수는 남겨둔다 — 로컬에서 다른 백엔드를 붙여보거나 미리보기 배포를 가리킬 때 쓴다.
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
});
