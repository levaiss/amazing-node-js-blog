
import express, { Request, Response , Application } from 'express';
import 'dotenv/config';

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('⚡️Welcome to Express Server!');
});

app.listen(port, () => {
    console.log(`🔥Server is Fire at http://localhost:${port}`);
});
