import { DbService } from '../services/DbService.ts';

export interface IUser {
  login: string;
  password: string;
}

export class UserModel {
  private readonly login: string;
  private readonly password: string;

  constructor({ login, password }: IUser) {
    this.login = login;
    this.password = password;
  }

  async save(): Promise<IUser> {
    const newUser = {
      login: this.login,
      password: this.password
    };

    const { getData, setData } =  DbService.getInstance();
    const db = await getData();
    db.users.push(newUser);
    await setData(db);

    return newUser;
  }

  static async getAll(): Promise<IUser[]> {
    const { getData } =  DbService.getInstance();
    const db = await getData();
    return db.users as IUser[];
  }
}