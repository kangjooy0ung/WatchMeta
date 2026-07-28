import cors from 'cors';
import express from 'express';
import { playersRouter } from './routes/players.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/players', playersRouter);

  return app;
}
