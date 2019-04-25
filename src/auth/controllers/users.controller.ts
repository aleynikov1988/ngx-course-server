import { Controller, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { AuthService } from '../services/auth.service';
import { IUser, User } from '../schemas/user.schema';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@ApiUseTags('user')
@Controller('user')
export class UserController {
    public constructor(private readonly _authService: AuthService) {}

    @Put('devices')
    public async updateDevice(@Body() data: { id: string; devices: string }, @Res() res: Response): Promise<Response> {
        try {
            const { id, devices } = data;
            const user: IUser | null = await this._authService.devicesUser(id, { devices });
            return res.status(HttpStatus.OK).json({ data: user, error: null });
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({ data: null, Error: e });
        }
    }

    @Put('updateuser')
    @ApiOperation({ title: 'Update user' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'User with token' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Wrong login or password' })
    // tslint:disable-next-line:no-any
    public async updateUser(@Body() updateUserDto: any, @Res() res: Response, @Req() req: Request): Promise<Response> {
        try {
            const username: string = req.user.username;
            const { oldPass, pass } = updateUserDto;

            const user: User = await this._authService.getUserWithToken({ username });
            // tslint:disable-next-line:no-any
            let newUser: any;
            let hash: string | undefined;
            let isCurrentPasswordValid: boolean;
            if (oldPass) {
                isCurrentPasswordValid = await bcrypt.compare(oldPass, user.password as string);
                if (!isCurrentPasswordValid) {
                    return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error: 'Invalid password' });
                }
                hash = pass && (await bcrypt.hash(pass, 10));
            }
            newUser = {
                ...user,
                username,
                surname: updateUserDto.surname,
                name: updateUserDto.name,
                adress: updateUserDto.adress,
                password: hash ? hash : user.password,
                gender: updateUserDto.gender,
            };
            const updateUser: User = await this._authService.updateUser(newUser);
            if (!updateUser) {
                throw new Error('unable to update user');
            }
            return res.status(HttpStatus.OK).json({ data: updateUser, error: null });
        } catch (error) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ data: null, error: error.message });
        }
    }

    @Post('checkPassword')
    // tslint:disable-next-line:no-any
    public async checkPass(@Body() updateUserDto: any, @Res() res: Response, @Req() req: Request): Promise<Response> {
        try {
            const username: string = req.user.username;
            const user: User = await this._authService.getUserWithToken({ username });
            let isCurrentPasswordValid: boolean;
            if (updateUserDto.data) {
                isCurrentPasswordValid = await bcrypt.compare(updateUserDto.data, user.password as string);
                if (!isCurrentPasswordValid) {
                    return res.status(HttpStatus.OK).json({ 'Вы ввели не верный пароль': true });
                }
            }
            return res.status(HttpStatus.OK).json({ data: null });
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error: 'No user' });
        }
    }
}
