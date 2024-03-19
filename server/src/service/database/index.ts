import mongoose from 'mongoose';
import { InternalServerError } from '../../errors';

export default class Database {
  private readonly URI: string;
  constructor(URI = '') {
    this.URI = URI;
  }

  async initialization() {
    this.listenEvents();
    await this.connect();
  }

  private async connect() {
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
