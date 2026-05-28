import express from 'express';
import cors from 'cors';
import router from './routes/index';
import { errorHandler } from './middleware/error.middleware';
import { HttpError } from './utils/http-error';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api', router);
app.use((_req, _res, next) => {
  next(new HttpError(404, 'Route not found.'));
});

app.use(errorHandler);

export default app;
