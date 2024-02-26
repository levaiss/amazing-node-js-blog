import bcrypt from 'bcrypt';

export default class AuthService {
  static async createHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(6);
    return await bcrypt.hash(password, salt);
  }

  static comparePassword(hashedPassword: string, password: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
}