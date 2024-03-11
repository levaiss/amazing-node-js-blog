// Core
import mongoose, { Schema, Document, InferSchemaType } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: String,
});

export type TUser = InferSchemaType<typeof UserSchema> & Document;

export const UserModel = mongoose.model('User', UserSchema);
