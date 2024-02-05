import { sleep } from '../utils/sleep.ts';
import { users } from '../db/users.ts';

export interface IUser {
  username: string;
  password: string;
}

export class UserModel {
  private readonly username: string;
  private readonly password: string;

  constructor({ username, password }: IUser) {
    this.username = username;
    this.password = password;
  }

  async save(): Promise<boolean> {
    await sleep(200);
    users.push({
      username: this.username,
      password: this.password,
    });
    return true;
  }

  static async getAll(): Promise<IUser[]> {
    await sleep(400);
    return users;
  }

  static async getByUsername(username: string): Promise<IUser | undefined> {
    const allUsers = await this.getAll();
    return allUsers.find((user) => user.username === username);
  }
}
