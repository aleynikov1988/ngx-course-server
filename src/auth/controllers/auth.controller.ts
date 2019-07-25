import { LoginDto, UpdateUserDto, UserDto } from '../dto/user.dto';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../services/auth.service';
import { IUser, User } from '../schemas/user.schema';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    public constructor(private readonly _authService: AuthService) {}

    @Post('signup')
    @ApiOperation({ title: 'User sign up (create user)' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The record has been successfully created.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'The record already exists' })
    public async signUp(@Body() createUserDto: UserDto, @Res() res: Response): Promise<Response> {
        try {
            const { username, email } = createUserDto;
            const user: IUser | null = await this._authService.getUser({ $or: [{ username }, { email }] });
            if (user) {
                return res
                    .status(HttpStatus.CONFLICT)
                    .json({ data: null, error: 'Invalid username or email already exists' });
            }
            const hash: string = await bcrypt.hash(createUserDto.password, 10);
            let userForCreate: UserDto = {
                ...createUserDto,
                password: hash,
            };
            userForCreate = await this._authService.createToken(userForCreate);
            const newUser: User = await this._authService.createUser(userForCreate);
            delete newUser.password;
            return res.status(HttpStatus.OK).json({ data: newUser, error: null });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error });
        }
    }

    @Post('signin')
    @ApiOperation({ title: 'User sign in' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Wrong username or password' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST })
    public async signIn(@Body() loginUserDto: LoginDto, @Res() res: Response): Promise<Response> {
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
    @Post('checkUsername')
    @ApiOperation({ title: 'Username existence validation' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST })
    public async checkUsername(@Body() updateUserDto: { username: string }, @Res() res: Response): Promise<Response> {
        try {
            const users: User[] = await this._authService.getUsers({ username: updateUserDto.username });
            if (users && users.length > 0) {
                return res.status(HttpStatus.OK).json({ 'Имя пользователя занято': true });
            }
            return res.status(HttpStatus.OK).json({ data: null });
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error: 'No user' });
        }
    }
}
