import { Body, Controller, Get, HttpStatus, Put, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { PresetNotificationsLogService } from '../services/preset-notifcation.service';
import { INotificationLog } from '../shcemas/notification-log.schema';

@ApiUseTags('notification')
@Controller('notification')
export class NotificationController {
    public constructor(private _presetNotif: PresetNotificationsLogService) {}

    @Get('checkPage')
    public async checkPage(
        @Req() req: Request,
        @Query() param: { page: number },
        @Res() res: Response
    ): Promise<Response> {
        try {
            const { page } = param;
            const perPage: number = 10;
            const tableData: INotificationLog[] | null = await this._presetNotif.getNotifyForTable(page, perPage);
            return res.status(HttpStatus.OK).json({ data: { flag: !!tableData.length }, error: null });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error: error.message });
        }
    }

    @Get('getAll')
    @ApiOperation({ title: 'Update card' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    public async updateDevice(@Res() res: Response, @Req() req: Request): Promise<Response> {
        try {
            const username: string = req.user.username;
            let notifications: INotificationLog[] = (await this._presetNotif.getAllNotification()) || [];
            if (notifications.length !== 0) {
                notifications = notifications.map((i: INotificationLog) => {
                    // tslint:disable-next-line:no-any
                    const status: any = i.users.filter((j: any) => j.username === username);
                    if (status.length > 0) {
                        i.status = status[0].status;
                        delete i.users;
                        return i;
                    }
                });
            }
            // tslint:disable-next-line:no-any
            notifications = notifications.filter((i: any) => i);
            return res.status(HttpStatus.OK).json({
                data: !notifications ? 0 : notifications.filter((notify: INotificationLog) => notify.status).length,
                error: null,
            });
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({ data: null, Error: e });
        }
    }

    @Put('updateStatus')
    @ApiOperation({ title: 'Update card' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    public async updateCard(
        @Req() req: Request,
        @Body() data: { _id: string },
        @Res() res: Response
    ): Promise<Response> {
        try {
            const username: string = req.user.username;
            const notify: INotificationLog = await this._presetNotif.updateStatus(data._id, username);
            // tslint:disable-next-line:no-any
            notify.status = notify.users.filter((j: any) => j.username === username)[0].status;
            delete notify.users;
            return res.status(HttpStatus.OK).json({ data: notify, error: null });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error: error.message });
        }
    }

    @Get('table')
    @ApiOperation({ title: 'Table' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    public async getTable(
        @Req() req: Request,
        @Query() param: { page: number },
        @Res() res: Response
    ): Promise<Response> {
        try {
            const username: string = req.user.username;
            const { page } = param;
            const perPage: number = 10;
            const allData: INotificationLog[] = await this._presetNotif.getAllNotification();
            let tableData: INotificationLog[] | null = await this._presetNotif.getNotifyForTable(page, perPage);
            if (tableData.length !== 0) {
                tableData = tableData.map((i: INotificationLog) => {
                    // tslint:disable-next-line:no-any
                    const status: any = i.users.filter((j: any) => j.username === username);
                    if (status.length > 0) {
                        i.status = status[0].status;
                        delete i.users;
                        return i;
                    }
                });
            }
            // tslint:disable-next-line:no-any
            tableData = tableData.filter((i: any) => i);
            return res
                .status(HttpStatus.OK)
                .json({ data: { table: tableData || [], page, length: allData.length }, error: null });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error: error.message });
        }
    }
}
