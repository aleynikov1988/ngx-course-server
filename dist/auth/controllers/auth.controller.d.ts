import { CreateUserDto } from '../dto/create-user.dto';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private readonly _authService;
    constructor(_authService: AuthService);
    signUp(createUserDto: CreateUserDto, res: Response): Promise<Response>;
    signIn(loginUserDto: any, res: Response): Promise<Response>;
}
