import { Controller, HttpStatus, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { AuthService } from '../services/auth.service';
import { IUser } from '../schemas/user.schema';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('user')
@Controller('user')
export class UserController {
    public constructor(private readonly _authService: AuthService) {}

    @Put('devices')
    public async updateDevice(
        @Body() data: { email: string; devices: string },
        @Res() res: Response
    ): Promise<Response> {
        try {
            const { email, devices } = data;
            const user: IUser | null = await this._authService.devicesUser(email, { devices });
            return res.status(HttpStatus.OK).json({ data: user, error: null });
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({ data: null, Error: e });
        }
    }
}
