import * as mongoose from 'mongoose';
import { IUser } from '../../auth/schemas/user.schema';

export const notificationLogSchema: mongoose.Schema = new mongoose.Schema({
    notification: {
        type: Object,
        required: false,
    },
    users: {
        type: [{ _id: String, status: Boolean }],
        required: false,
    },
    dateSend: {
        type: Date,
        required: true,
    },
    notRead: {
        type: Boolean,
        required: false,
        default: true,
    },
    author: {
        type: String,
        required: false,
    },
});

// tslint:disable-next-line:interface-name
export interface NotificationLog {
    // tslint:disable-next-line:no-any
    notification?: any;
    // tslint:disable-next-line:no-any
    users: [{ _id: string; status: boolean }];
    dateSend: Date;
    author?: IUser;
    notRead?: boolean;
}

export interface INotificationLog extends mongoose.Document, NotificationLog {}
