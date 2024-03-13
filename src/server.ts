// Core
import 'dotenv/config';
import express, { Application } from 'express';
import passport from 'passport';

// Router
import router from './router/index';

// Database
import Database from './service/database';

// Services
import AuthService, { AUTH_STRATEGIES_TYPE } from './service/auth';

// Middlewares
import { requestLoggerMiddleware } from './middleware/request-logger.middleware';
import { notFoundHandlerMiddleware } from './middleware/not-found-handler.middleware';
import { errorHandlerMiddleware } from './middleware/error-handler.middleware';

export default class Server {
  private readonly app: Application;
  private readonly port: string | number;
  private readonly mongoDbURI: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.mongoDbURI = process.env.MONGO_DB_URI || '';
  }

  async initServices() {
    await new Database(this.mongoDbURI).connect();
  }

  initApplication() {
    this.app.use(express.json());
    this.app.use(requestLoggerMiddleware);
    this.app.use(router);
    this.app.use(passport.initialize());
    this.app.use(notFoundHandlerMiddleware);
    this.app.use(errorHandlerMiddleware);

    passport.use(AUTH_STRATEGIES_TYPE.ACCESS_TOKEN, AuthService.getAccessTokenStrategy());
    passport.use(AUTH_STRATEGIES_TYPE.REFRESH_TOKEN, AuthService.getRefreshTokenStrategy());
  }

  initServer() {
    this.app.listen(this.port, async () => {
      console.log(`🔥Server is Fire at http://localhost:${this.port}`);
    });
  }

  async run() {
    await this.initServices();
    this.initApplication();
    this.initServer();
  }
}
