import path from 'path';
import { fileURLToPath } from 'url';
import express, { Application } from 'express';
import 'dotenv/config';
import { DbService } from './services/DbService.ts';
import router from './router/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname);
const port = process.env.PORT || 8000;

(async () => {
  const dbFolderPath = path.join(rootPath, 'db');
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
