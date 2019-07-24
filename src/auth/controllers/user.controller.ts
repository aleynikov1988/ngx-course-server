import { Controller, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../services/auth.service';
import { IAddress, User } from '../schemas/user.schema';
import { UpdateUserDto } from '../dto/user.dto';

@ApiUseTags('user')
@Controller('user')
export class UserController {
    public constructor(private readonly _authService: AuthService) {}

    @Post('checkuser')
    @ApiOperation({ title: 'Validate user token' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST })
    // tslint:disable-next-line:no-any
    public async checkUser(@Body() loginUserDto: any, @Res() res: Response): Promise<Response> {
        try {
            const { token } = loginUserDto;
            if (!token) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ data: null, error: 'UNAUTHORIZED' });
            }
            const user: User = await this._authService.getUserWithToken({ accessToken: token });
            return res.status(HttpStatus.OK).json({ data: user, error: null });
        } catch (error) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ data: null, error: 'UNAUTHORIZED' });
        }
    }

    @Put('updateuser')
    @ApiOperation({ title: 'Update user' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST })
    // tslint:disable-next-line:no-any
    public async updateUser(
        @Body() updateUserDto: UpdateUserDto,
        @Res() res: Response,
        @Req() req: Request
    ): Promise<Response> {
        try {
            const username: string = req.user.username;
            const { oldPass, pass } = updateUserDto;
            const { index } = updateUserDto;
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
            if (typeof index !== 'number') {
                newUser = {
                    ...user,
                    username,
                    surname: updateUserDto.surname,
                    name: updateUserDto.name,
                    address: updateUserDto.address,
                    password: hash ? hash : user.password,
                    gender: updateUserDto.gender,
                };
            } else {
                newUser = {
                    ...user,
                    username,
                    address: user.address.filter((address: IAddress, i: number) => index !== i),
                };
            }
            const updateUser: User = await this._authService.updateUser(newUser);
            if (!updateUser) {
                return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error: 'BAD_REQUEST' });
            }
            return res.status(HttpStatus.OK).json({ data: updateUser, error: null });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error: error.message });
        }
    }
}
