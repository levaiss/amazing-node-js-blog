import mongoose from 'mongoose';
import { InternalServerError } from '../../errors';

export default class Database {
  private readonly URI: string;
  constructor(URI = '') {
    this.URI = URI;
  }
  async connect() {
    try {
      await mongoose.connect(this.URI);
    } catch (e) {
      throw new InternalServerError('❌ Failed to connect to database', e);
    }
  }
}
