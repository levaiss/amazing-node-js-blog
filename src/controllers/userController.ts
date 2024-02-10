import { UserModel } from '../models/UserModel.ts';
import { IUser } from '../models/UserModel.ts';

export async function createUser(payload: IUser): Promise<IUser> {
  const newUser = new UserModel(payload);
  return await newUser.save();
}

export async function getAllUsers(): Promise<IUser[]> {
  return await UserModel.getAll();
}