// Core
import { Schema, model } from 'mongoose';
import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IUser>('User', userSchema);
