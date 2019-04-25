import * as mongoose from 'mongoose';

export const adressSchema: mongoose.Schema = new mongoose.Schema({
    street: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    zip: {
        type: String,
        required: false,
    },
});

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
        adress: [adressSchema],
        surname: {
            type: String,
            required: false,
        },
        gender: {
            type: Boolean,
        }
    },
    { collection: 'users' }
);

export type User = {
    readonly username: string;
    readonly surname: string;
    readonly email: string;
    readonly name?: string;
    password: string;
    readonly createdAt?: Date;
    devices?: string;
    accessToken?: string;
    gender: boolean;
    adress: IAdress[];
};

export type IAdress = {
    street: string;
    city: string;
    state: string;
    zipCode: string;
};

export interface IUser extends mongoose.Document, User {}
