import * as mongoose from 'mongoose';

export const productSchema: mongoose.Schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        isFavorite: {
            type: Boolean,
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
