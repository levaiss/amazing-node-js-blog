// Core
import mongoose from 'mongoose';

// Helpers
import { InternalServerError } from '../../errors';

export default class DatabaseService {
  private static instance: DatabaseService;
  private URI?: string;
  constructor() {}
  static getInstance() {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async initialization(URI = '') {
    this.URI = URI;
    this.listenEvents();
    await this.connect();
  }

  private async connect() {
    if (!this.URI) {
      throw new InternalServerError('❌ Database URI is not provided');
    }

    try {
      await mongoose.connect(this.URI);
    } catch (e) {
      throw new InternalServerError('❌ Failed to connect to database', e);
    }
  }

  private listenEvents() {
    mongoose.connection.on('connected', () => {
      console.info('🔥 Mongoose connected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', () => {
      console.info('❌ Mongoose default connection disconnected');
    });
  }
}
