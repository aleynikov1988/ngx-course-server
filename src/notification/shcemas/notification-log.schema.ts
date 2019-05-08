import * as mongoose from 'mongoose';

export const notificationLogSchema: mongoose.Schema = new mongoose.Schema({
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
    cardId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
});

// tslint:disable-next-line:interface-name
export interface NotificationLog {
    text: string;
    // tslint:disable-next-line:no-any
    users: any;
    title: string;
    dateSend: Date;
    author?: string;
    status?: boolean;
    cardId: string;
}

export interface INotificationLog extends mongoose.Document, NotificationLog {}
