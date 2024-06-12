import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

// To load env files on start:
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_PUBLIC_KEY ? process.env.AUTH_PUBLIC_KEY.replace(/\\n/gm, '\n') : 'secret',
    });
  }

  
  async validate(payload: Record<string, any>): Promise<any> {
    return { user: payload.user };  // Return user object:
  }
}