import 'dotenv/config';
import express, { Application } from 'express';
import router from './router/index';
import { errorHandler } from './middleware/error-handler';
import { notFoundHandler } from './middleware/not-found-handler';
import { requestLogger } from './middleware/request-logger';
import { recordCreateSchema } from './validation/record';

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

// Task 2 test:
(async () => {
  const exampleData = {
    line: 1,
    valve: [13, 14, 15, 16, 17, 18, 19],
    start: 0,
    end: 0,
    type: 'MM',
    amount: 1,
    fertigation: true,
    start_date: '2024-04-01',
    machine: 0,
    cycles: 3,
    interval: 10,
    field: { someid: 1234 },
    fert_recipe: 49,
  };
  const { value, error } = recordCreateSchema.validate(exampleData);
  if (error) {
    console.error('Error: ', error);
  } else {
    console.log('Success: ', value);
  }
})();