import * as mongoose from 'mongoose';

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
        type: [{ _id: String, status: { type: Boolean, default: true }, username: String }],
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
    // tslint:disable-next-line:no-any
    users: any;
    dateSend: Date;
    author?: string;
    status?: boolean;
}

export interface INotificationLog extends mongoose.Document, NotificationLog {}
