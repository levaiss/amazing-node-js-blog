// Core
import { Strategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Models
import { User } from '../models/User';

// Helpers
import { accessTokenSecretKey, refreshTokenSecretKey } from '../config/jwt-config';
import { ValidationError } from '../errors';

export interface IJwtTokenPayload {
  username: string,
  userId: string,
  iat: number,
  exp: number
}

export default class AuthService {
  static getJwtStrategy() {
    const jwtStrategyOption = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: accessTokenSecretKey,
    };

    return new Strategy(jwtStrategyOption, async (payload, done) => {
      try {
        const user = await User.getById(payload.userId);

        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (e) {
        console.error('[JwtStrategy]', e);
      }
    })
  }

  static createAccessToken(username: string, userId: string): string {
    return jwt.sign(
      {
        username,
        userId,
      },
      accessTokenSecretKey,
      { expiresIn: '1h' },
    )
  }

  static createRefreshToken(username: string, userId: string): string {
    return jwt.sign(
      {
        username,
        userId,
      },
      refreshTokenSecretKey,
      { expiresIn: '7d' },
    )
  }

  static decodeRefreshToken(token: string): IJwtTokenPayload | ValidationError {
    try {
      return jwt.verify(token, refreshTokenSecretKey) as IJwtTokenPayload;
    } catch(e) {
      return new ValidationError('Refresh token is incorrect or expired');
    }

  }

  static async createHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(6);
    return await bcrypt.hash(password, salt);
  }

  static comparePassword(hashedPassword: string, password: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
}