import { Inject, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as request from 'request-promise';
import { AuthService } from '../../auth/services/auth.service';
import { IUser } from '../../auth/schemas/user.schema';
import { INotificationLog } from '../shcemas/notification-log.schema';

type NotifyData = {
    title: string;
    text: string;
    author?: string;
    dateSend?: Date;
};

@Injectable()
export class PresetNotificationsLogService {
    public constructor(
        @Inject('notificationLogModel') private readonly _notificationLogModel: mongoose.Model<INotificationLog>,
        private readonly _authService: AuthService
    ) {}

    public async notify(data: NotifyData): Promise<void> {
        try {
            const users: IUser[] = await this._authService.getUsersByIds([], { devices: 1 });
            // tslint:disable-next-line
            const notificationObj: any = {
                ...data,
                users,
                date: new Date(),
            };
            await this._notificationLogModel.create({
                ...notificationObj,
            });
            const devices: string[] = users.map((user: IUser) => user.devices);
            // tslint:disable-next-line
            const result: any = {
                notification: { title: notificationObj.title, body: notificationObj.text },
                registration_ids: devices.filter(Boolean),
            };
            // tslint:disable-next-line
            const options: any = {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        // tslint:disable-next-line: max-line-length
                        'key=AAAAzVlzutM:APA91bEQh6eKYLMntEli_LNShRY1_SAomQL5GLy51gy4wPc2Ry9LBzmCAp7aFsvKWYmEkd4FyqoltIkPRPWX_XLFMtaHRnmjuV6AoUFXuBQeMA3uKaOoTY9dVyKAHmxJ4pKuOxeuv8ez',
                },
                body: JSON.stringify(result),
            };
            await request.post(`https://fcm.googleapis.com/fcm/send`, options);
        } catch (err) {
            // tslint:disable-next-line
            console.log(`Error when send notify ===> ${err}`);
        }
    }
}
