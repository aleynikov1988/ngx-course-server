import { Inject, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as request from 'request-promise';
import { AuthService } from '../../auth/services/auth.service';
import { IUser } from '../../auth/schemas/user.schema';
import { INotificationLog } from '../shcemas/notification-log.schema';

type NotifyData = {
    payload: string;
    author?: mongoose.Types.ObjectId[];
    dateSend?: Date;
};

@Injectable()
export class PresetNotificationsLogService {
    public constructor(
        @Inject('notificationLogModel') private readonly _notificationLogModel: mongoose.Model<INotificationLog>,
        private readonly _authService: AuthService
    ) {}

    public async notify(
        data: NotifyData,
        // tslint:disable-next-line:no-any
        usersArr: { _id: any }[]
    ): Promise<void> {
        try {
            // tslint:disable-next-line
            const notificationObj: any = {
                data,
                users: usersArr.map((user: { // tslint:disable-next-line:no-any
                    _id: any }) => ({ _id: user._id.toString(), status: false })),
                // TODO should be ObjectID
            };
            // tslint:disable-next-line
            const createdNotify = await this._notificationLogModel.create({
                ...notificationObj,
            });
            const usersIds: mongoose.Types.ObjectId[] = notificationObj.users.map((user: IUser) => user._id);
            const users: IUser[] = await this._authService.getUsersByIds(usersIds, { devices: 1 });
            const devices: string[] = users.map((user: IUser) => user.devices);
            // tslint:disable-next-line
            const result: any = {
                notification: notificationObj.notification,
                data: notificationObj.data,
                registration_ids: devices.filter(Boolean),
            };
            result.data.id_notify = `${createdNotify._id}`;
            // tslint:disable-next-line
            const options: any = {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                    // tslint:disable-next-line:max-line-length
                    Authorization:
                        // tslint:disable-next-line: max-line-length
                        'key=AAAAzVlzutM:APA91bEQh6eKYLMntEli_LNShRY1_SAomQL5GLy51gy4wPc2Ry9LBzmCAp7aFsvKWYmEkd4FyqoltIkPRPWX_XLFMtaHRnmjuV6AoUFXuBQeMA3uKaOoTY9dVyKAHmxJ4pKuOxeuv8ez',
                },
                body: JSON.stringify(result),
            };
            await request.post(`https://fcm.googleapis.com/fcm/send`, options);
            const _id: mongoose.Types.ObjectId = mongoose.Types.ObjectId(createdNotify._id);
            delete createdNotify._id;
            // tslint:disable-next-line
            await this._notificationLogModel.updateOne({ _id }, { status: 'success' });
        } catch (err) {
            // tslint:disable-next-line
            console.log(`Error when send notify ===> ${err}`);
        }
    }
}
