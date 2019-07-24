import { IProduct } from './../schemas/product.schema';
import * as jwt from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { IUser, User } from '../schemas/user.schema';
import { ConfigService } from '../../config.service';
import { Product } from '../schemas/product.schema';

@Injectable()
export class AuthService {
    public constructor(
        @Inject('UserModelToken') private readonly _userModel: mongoose.Model<IUser>,
        @Inject('ProductModelToken') private readonly _productModel: mongoose.Model<IProduct>,
        private readonly _config: ConfigService,
    ) {
    }

    public async createToken(user: IUser): Promise<User> {
        const secret: string = this._config.get('secret');
        const { username } = user;

        const payload: { username: string } = {
            username,
        };

        const accessToken: string = jwt.sign(payload, secret);

        return {
            ...user,
            accessToken,
        } as User;
    }

    public async validateUser(username: string): Promise<boolean> {
        const user: IUser | null = await this._userModel
            .findOne({ username })
            .lean()
            .exec();
        if (!user) {
            return false;
        }
        return true;
    }

    // tslint:disable-next-line: no-any
    public async createUser(createUserDto: any): Promise<IUser> {
        return await this._userModel.create(createUserDto);
    }

    // tslint:disable-next-line: no-any
    public async updateUser(createUserDto: any): Promise<IUser | null> {
        return await this._userModel.findOneAndUpdate({ username: createUserDto.username }, createUserDto, {
            new: true,
        });
    }

    // tslint:disable-next-line
    public async getUser(query: any, projection: {} = {}): Promise<IUser | null> {
        let user: IUser | null;
        try {
            user = await this._userModel
                .findOne(query, projection)
                .lean()
                .exec();
        } catch (err) {
            // tslint:disable-next-line
            console.log(err);
            user = null;
        }
        return user;
    }

    // tslint:disable-next-line: no-any
    public async getUserWithToken(query: any): Promise<User> {
        return await this._userModel
            .findOne(query)
            .lean()
            .exec();
    }

    public async getAllProducts(): Promise<Product[] | null> {
        return await this._productModel
            .find()
            .lean()
            .exec();
    }

    // tslint:disable-next-line: no-any
    public async getProductById({ id: _id }: any): Promise<Product | null> {
        return await this._productModel
            .findOne({ _id })
            .lean()
            .exec();
    }
}
