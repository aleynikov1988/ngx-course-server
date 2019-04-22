import * as mongoose from 'mongoose';

export enum CardStatus {
    BACKLOG = 'backlog',
    PROGRESS = 'progress',
    QA = 'qa',
    DONE = 'done',
}

export const cardSchema: mongoose.Schema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: false,
        default: CardStatus.BACKLOG,
    },
    owner: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
        default: Date.now,
    }
});

// tslint:disable-next-line:interface-name
export interface Card {
    // tslint:disable-next-line:no-any
    _id: any;
    description: string;
    status: CardStatus;
    // tslint:disable-next-line:no-any
    owner: any;
    date: Date;
}

export interface ICard extends mongoose.Document, Card {}
