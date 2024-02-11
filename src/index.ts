import 'dotenv/config';
import path from 'path';
import express, { Application } from 'express';
import { DbService } from './services/DbService.ts';
import router from './router/index.ts';
import { srcPath } from './utils/path-helper.ts';

const port = process.env.PORT || 8000;

(async () => {
  const dbFolderPath = path.join(srcPath, 'db');
  const db = DbService.getInstance();
  await db.create(dbFolderPath, 'db.json', {
    users: [
      {
        login: "admin",
        password: "1234"
      }
    ]
  });
})()

const app: Application = express();

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`🔥Server is Fire at http://localhost:${port}`);
});
