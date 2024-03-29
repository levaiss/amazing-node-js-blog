// Core
import path from 'path';
import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config({ path: '../.env' });

// Router
import router from './router/index';

// Database
import Database from './service/database';

// Services
import AuthService, { AUTH_STRATEGIES_TYPE } from './service/auth';

// Middlewares
import { notFoundHandlerMiddleware } from './middleware/not-found-handler.middleware';
import { errorHandlerMiddleware } from './middleware/error-handler.middleware';

// Helpers
import { rootPath } from './utils/path-helper';
import { swaggerJsdocOptions } from './config/swaggerJsdoc.config';
import { isProduction } from './utils/env-helper';

export default class Server {
  private readonly app: Application;
  private readonly port: string | number;
  private readonly mongoDbURI: string;

  constructor() {
    this.app = express();
    this.port = process.env.APP_PORT || 3000;
    this.mongoDbURI = process.env.MONGODB_URI || '';
  }

  async initServices() {
    await new Database(this.mongoDbURI).initialization();
  }

  initApplication() {
    this.app.use(cors());
    this.app.use(express.json());

    if (!isProduction) {
      this.app.use(morgan('tiny'));
    }

    this.app.use(express.static(path.join(rootPath, 'client/dist')));

    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerJsdocOptions)));
    this.app.use(router);

    this.app.use(passport.initialize());
    this.app.use(notFoundHandlerMiddleware);
    this.app.use(errorHandlerMiddleware);

    passport.use(AUTH_STRATEGIES_TYPE.ACCESS_TOKEN, AuthService.getAccessTokenStrategy());
    passport.use(AUTH_STRATEGIES_TYPE.REFRESH_TOKEN, AuthService.getRefreshTokenStrategy());
  }

  initServer() {
    this.app.listen(this.port, async () => {
      console.log(`🔥 Server is Fire at http://localhost:${this.port}`);
    });
  }

  async run() {
    await this.initServices();
    this.initApplication();
    this.initServer();
  }
}
