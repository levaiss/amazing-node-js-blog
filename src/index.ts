// Core
import 'dotenv/config';
import express, { Application } from 'express';
import passport from 'passport';

// Router
import router from './router/index';

// Services
import AuthService from './services/auth-service';

// Middlewares
import { requestLoggerMiddleware } from './middleware/request-logger-middleware';
import { notFoundHandlerMiddleware } from './middleware/not-found-handler-middleware';
import { errorHandlerMiddleware } from './middleware/error-handler-middleware';

const port = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(requestLoggerMiddleware);
app.use(router);
app.use(passport.initialize());
app.use(notFoundHandlerMiddleware);
app.use(errorHandlerMiddleware);

AuthService.initJwtStrategy(passport);

app.listen(port, async () => {
  console.log(`🔥Server is Fire at http://localhost:${port}`);
});