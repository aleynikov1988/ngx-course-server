import * as mongoose from 'mongoose';

export const productSchema: mongoose.Schema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
            required: true,
        },
        img: {
            type: String,
            unique: true,
            required: true,
        },
        price: {
            type: Number,
            unique: true,
            required: true,
        },
        author: {
            type: String,
            unique: true,
            required: true,
        },
        isFavorite: {
            type: Boolean,
            unique: true,
            required: true,
        },
    },
    { collection: 'products' }
);

export type Product = {
    readonly title: string;
    img: string;
    price: number;
    readonly author: string;
    isFavorite: boolean;
};

export interface IProduct extends mongoose.Document, Product {
    _id: mongoose.Types.ObjectId;
}
