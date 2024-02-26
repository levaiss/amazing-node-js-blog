import 'dotenv/config';
import express, { Application } from 'express';
import router from './router/index';
import { errorHandler } from './middleware/error-handler';
import { notFoundHandler } from './middleware/not-found-handler';
import { requestLogger } from './middleware/request-logger';

const port = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, async () => {
  console.log(`🔥Server is Fire at http://localhost:${port}`);
});

