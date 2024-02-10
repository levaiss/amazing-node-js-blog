import { DbService } from '../services/DbService';
import { ValidationError } from '../utils/error-helper';

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
    const isUserUnique = db.users.every(({login}) => login !== this.login);
    if (!isUserUnique) {
      throw new ValidationError('This login is already taken.')
    }

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