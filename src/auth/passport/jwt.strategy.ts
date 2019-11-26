import * as passport from 'passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '../../config.service';

@Injectable()
export class JwtStrategy extends Strategy {
    // @ts-ignore
    public constructor(private readonly _authService: AuthService, private readonly _config: ConfigService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                passReqToCallback: true,
                secretOrKey: _config.get('secret'),
            },
            async (req: Request, payload: { username: string }, next: NextFunction) =>
                await this.verify(req, payload, next)
        );
        passport.use(this);
    }

    public async verify(_req: Request, payload: { username: string }, done: VerifiedCallback): Promise<void> {
        const isValid: boolean = await this._authService.validateUser(payload.username);

        if (!isValid) {
            return done(null, false);
        }
        return done(null, payload);
    }
}
