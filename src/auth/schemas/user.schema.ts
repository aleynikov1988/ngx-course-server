import * as mongoose from 'mongoose';

export const userSchema: mongoose.Schema = new mongoose.Schema(
    {
        createdAt: {
            type: Date,
            required: true,
            default: new Date(),
        },
        username: {
            type: String,
            unique: true,
            required: true,
        },
        name: {
            type: String,
            unique: false,
            required: false,
        },
        email: {
            type: String,
            unique: false,
            required: false,
        },
        password: {
            type: String,
            required: false,
        },
        devices: {
            type: String,
            required: false,
        },
        accessToken: {
            type: String,
            required: false,
        },
    },
    { collection: 'users' }
);

export type User = {
    readonly username: string;
    readonly email: string;
    readonly name?: string;
    password: string;
    readonly createdAt?: Date;
    devices?: string;
};

export interface IUser extends mongoose.Document, User {}
