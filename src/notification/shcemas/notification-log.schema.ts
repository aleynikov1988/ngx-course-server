import * as mongoose from 'mongoose';
import { IUser } from '../../auth/schemas/user.schema';

export const notificationLogSchema: mongoose.Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    users: {
        type: [{ _id: String, status: Boolean }],
        required: false,
    },
    date: {
        type: Date,
        required: true,
    },
    author: {
        type: String,
        required: false,
    },
});

// tslint:disable-next-line:interface-name
export interface NotificationLog {
    title: string;
    text: string;
    users: [{ _id: string; status: boolean }];
    dateSend: Date;
    author?: string;
}

export interface INotificationLog extends mongoose.Document, NotificationLog {}
