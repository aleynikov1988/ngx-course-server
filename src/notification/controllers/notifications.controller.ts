import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { PresetNotificationsLogService } from '../services/preset-notifcation.service';
import { INotificationLog } from '../shcemas/notification-log.schema';

@ApiUseTags('notification')
@Controller('notification')
export class NotificationController {
    public constructor(private _presetNotif: PresetNotificationsLogService) {}

    @Get('')
    @ApiOperation({ title: 'Update card' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    public async updateDevice( @Res() res: Response): Promise<Response> {
        try {
            const notifications: INotificationLog[] = (await this._presetNotif.getAllNotification()) || [];
            if (!Boolean(notifications.length)) {
                throw new Error('notification collections are empty');
            }
            return res.status(HttpStatus.OK).json({ data: notifications, error: null });
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({ data: null, Error: e });
        }
    }
}
