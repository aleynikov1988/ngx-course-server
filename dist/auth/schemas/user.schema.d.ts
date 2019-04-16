import * as mongoose from 'mongoose';
export declare const userSchema: mongoose.Schema;
export declare type User = {
    readonly username: string;
    readonly email: string;
    readonly name: string;
    password: string;
    readonly createdAt: Date;
};
export interface IUser extends mongoose.Document, User {
}
