import { IProduct } from './../schemas/product.schema';
import { Inject, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Product } from '../schemas/product.schema';

@Injectable()
export class ProductService {
    public constructor(@Inject('ProductModelToken') private readonly _productModel: mongoose.Model<IProduct>) {}

    public async getAllProducts(): Promise<Product[] | null> {
        return await this._productModel
            .find()
            .lean()
            .exec();
    }

    // tslint:disable-next-line: no-any
    public async getProductById(_id: string): Promise<Product | null> {
        return await this._productModel
            .findOne({ _id })
            .lean()
            .exec();
    }
}
