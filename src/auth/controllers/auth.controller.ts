import { CreateUserDto } from '../dto/create-user.dto';

import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { IUser, User } from '../schemas/user.schema';
import { AuthService } from '../services/auth.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../../config.service';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    public constructor(
        private readonly _authService: AuthService,
        private readonly _config: ConfigService,
        ) {}

    @Post('signup')
    @ApiOperation({ title: 'User sign up (create user)' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully created.' })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'The record already exists' })
    public async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<Response> {
        try {
            const { username, email } = createUserDto;
            const user: IUser | null = await this._authService.getUser({ $or: [{ username }, { email }] });
            if (user) {
                return res
                    .status(HttpStatus.CONFLICT)
                    .json({ data: null, error: 'Invalid username or email already exists' });
            }
            const hash: string = await bcrypt.hash(createUserDto.password, 10);
            // tslint:disable-next-line:no-any
            let userForCreate: any = {
                ...createUserDto,
                password: hash,
            };
            userForCreate = await this._authService.createToken(userForCreate);
            const { password, ...newUser }: User = await this._authService.createUser(userForCreate);
            return res.status(HttpStatus.OK).json({ data: newUser, error: null });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error });
        }
    }

    @Post('signin')
    @ApiOperation({ title: 'User sign in' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'User with token' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Wrong login or password' })
    // tslint:disable-next-line:no-any
    public async signIn(@Body() loginUserDto: any, @Res() res: Response): Promise<Response> {
        try {
            const { username, password: lpassword } = loginUserDto;
            const { password, ...user }: User = await this._authService.getUserWithToken({ username });
            if (!user || (user && !(await bcrypt.compare(lpassword, password)))) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    data: null,
                    error: 'Invalid username and/or password',
                });
            }
            return res.status(HttpStatus.OK).json({ data: user, error: null });
        } catch (error) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ data: null, error: 'Invalid username and/or password' });
        }
    }
}
