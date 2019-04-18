import * as mongoose from 'mongoose';

export const cardSchema: mongoose.Schema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: false,
        default: true,
    },
    owner: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now
    },
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

export type CardStatus = 'backlog' | 'progress' | 'qa' | 'done';