import cors from '@middlewares/cors';
import studyRouter from '@routers/studyRouter';
import userRouter from '@routers/userRouter';
import express from 'express';

import swagger from './swagger';

const app = express();

app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use('/api-docs', ...swagger);
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/user', userRouter);
app.use('/study', studyRouter);

export default app;
