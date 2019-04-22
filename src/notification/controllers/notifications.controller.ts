import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
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
    public async updateDevice(@Res() res: Response, @Req() req: Request): Promise<Response> {
        try {
            const username: string = req.user.username;
            let notifications: INotificationLog[] = (await this._presetNotif.getAllNotification()) || [];
            if (!Boolean(notifications.length)) {
                throw new Error('notification collections are empty');
            }
            notifications = notifications.map((i: INotificationLog) => {
                // tslint:disable-next-line:no-any
                i.status = i.users.filter((j: any) => j.username === username)[0].status;
                delete i.users;
                return i;
            });
            return res.status(HttpStatus.OK).json({ data: notifications, error: null });
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({ data: null, Error: e });
        }
    }
}
