import 'dotenv/config';
import express, { Application } from 'express';
import router from './router/index';

import initFirstTask from './tasks/1/index';
import initSecondTask from './tasks/2/index';

const port = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(router);

app.listen(port, async () => {
  console.log(`🔥Server is Fire at http://localhost:${port}`);

  await initFirstTask();
  await initSecondTask();
});

