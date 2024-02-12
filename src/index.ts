import 'dotenv/config';
import express, { Application } from 'express';
import router from './router/index';

const port = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`🔥Server is Fire at http://localhost:${port}`);
});
