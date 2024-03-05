// Core
import { v4 as uuidv4 } from 'uuid';

// Services
import AuthService from '../services/auth-service';

// Helpers
import { sleep } from '../utils/sleep';

export interface IUser {
  id: string;
  username: string;
  password: string;
  email?: string;
}

const users: IUser[] = [];

export class User {
  private readonly user = {} as IUser;

  constructor({ username, password, email }: IUser) {
    this.user.id = uuidv4();
    this.user.username = username;
    this.user.password = password;

    if (email) {
      this.user.email = email;
    }
  }

  async save(): Promise<IUser> {
    await sleep(200);

    const hashedPassword = await AuthService.createHashedPassword(this.user.password);

    users.push({
      ...this.user,
      password: hashedPassword
    });

    return this.user;
  }

  static async getAll(): Promise<IUser[]> {
    await sleep(400);
    return users;
  }

  static async getById(id: string): Promise<IUser | undefined> {
    const allUsers = await this.getAll();
    return allUsers.find((user) => user.id === id);
  }

  static async getByUsername(username: string): Promise<IUser | undefined> {
    const allUsers = await this.getAll();
    return allUsers.find((user) => user.username === username);
  }
}
