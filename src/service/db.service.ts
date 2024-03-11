import 'dotenv/config';
import mongoose from 'mongoose';
import { InternalServerError } from '../errors';

const URI = process.env.MONGO_DB_URI || '';

export default class DbService {
  async createConnection() {
    try {
      await mongoose.connect(URI);
    } catch (e) {
      throw new InternalServerError('❌ Failed to connect to database', e);
    }
  }
}
