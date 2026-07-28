import axios from 'axios';
import { Router } from 'express';
import { overfastClient, toPlayerId } from '../services/overfastClient.js';

export const playersRouter = Router();

playersRouter.get('/:battleTag/summary', async (req, res) => {
  const playerId = toPlayerId(req.params.battleTag);

  try {
    const [summaryRes, statsRes] = await Promise.all([
      overfastClient.get(`/players/${encodeURIComponent(playerId)}/summary`),
      overfastClient.get(`/players/${encodeURIComponent(playerId)}/stats/summary`),
    ]);

    res.json({
      summary: summaryRes.data,
      stats: statsRes.data,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      res.status(404).json({ message: '존재하지 않거나 비공개 프로필입니다.' });
      return;
    }

    res.status(502).json({ message: 'Overwatch 데이터를 가져오지 못했습니다.' });
  }
});
