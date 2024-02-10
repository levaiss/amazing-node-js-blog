import { UserModel } from '../models/UserModel';
import { IUser } from '../models/UserModel';

export async function createUser(payload: IUser): Promise<IUser> {
  const newUser = new UserModel(payload);
  return await newUser.save();
}

export async function getAllUsers(): Promise<IUser[]> {
  return await UserModel.getAll();
}