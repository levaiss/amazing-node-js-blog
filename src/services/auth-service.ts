// Core
import { PassportStatic } from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Models
import { User } from '../models/User';

// Helpers
import { jwtSecretKey } from '../config/jwt-config';

export default class AuthService {
  static initJwtStrategy(passport: PassportStatic) {
    const jwtStrategyOption = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecretKey,
    };

    passport.use(
      new Strategy(jwtStrategyOption, async (payload, done) => {
        try {
          const user = await User.getById(payload.userId);

          if (user) {
            done(null, user)
          } else {
            done(null, false)
          }
        } catch (e) {
          console.error('[passport/JwtStrategy]', e);
        }
      }));
  }

  static createJwtToken(username: string, userId: string): string {
    return jwt.sign(
      {
        username,
        userId,
      },
      jwtSecretKey,
      { expiresIn: '1h' },
    )
  }

  static async createHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(6);
    return await bcrypt.hash(password, salt);
  }

  static comparePassword(hashedPassword: string, password: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
}