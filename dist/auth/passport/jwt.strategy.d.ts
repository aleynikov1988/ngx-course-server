import { Strategy, VerifiedCallback } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { ConfigService } from 'src/config.service';
export declare class JwtStrategy extends Strategy {
    private readonly _authService;
    private readonly _config;
    constructor(_authService: AuthService, _config: ConfigService);
    verify(_req: Request, payload: any, done: VerifiedCallback): Promise<void>;
}
