import { Controller, HttpStatus, Put, Res } from '@nestjs/common';
import { Response } from 'express';
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
    public async updateUser(@Body() updateUserDto: any, @Res() res: Response): Promise<Response> {
        try {
            const { username, password: lpassword } = updateUserDto;
            const { password, ...user }: User = await this._authService.getUserWithToken({ username });
            if (!user || (user && !(await bcrypt.compare(lpassword, password)))) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    data: null,
                    error: 'Invalid username and/or password',
                });
            }
            // tslint:disable-next-line:no-any
            const newUser: any = {
                surname: updateUserDto.surname,
                username: updateUserDto.username,
                name: updateUserDto.name,
                email: updateUserDto.email,
                password,
                adress: updateUserDto.adress
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
}
