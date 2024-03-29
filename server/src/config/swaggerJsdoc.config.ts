// Core
import { join } from 'path';
import { srcPath } from '../utils/path-helper';

export const swaggerJsdocOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'API Documentation for blog API',
      contact: {
        name: 'Dmytro Levin',
        email: 'weblevin@gmail.com',
      },
    },
    servers: [
      {
        url: '/api',
        description: 'Development server',
      },
    ],
  },
  apis: [join(srcPath, '/router/**/*.ts')],
};
