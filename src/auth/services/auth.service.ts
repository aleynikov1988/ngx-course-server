import * as jwt from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { IUser, User } from '../schemas/user.schema';
import { ConfigService } from '../../config.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class AuthService {
    public constructor(
        @Inject('UserModelToken') private readonly _userModel: mongoose.Model<IUser>,
        private readonly _config: ConfigService
    ) {}

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

    // tslint:disable-next-line
    public async getUser(query: any): Promise<IUser | null> {
        let user: IUser | null;
        try {
            user = await this._userModel
                .findOne(query)
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
        const user: IUser = await this._userModel
            .findOne(query)
            .lean()
            .exec();
        return await this.createToken(user);
    }

    public async getUsersByIds(
        idList: mongoose.Types.ObjectId[],
        // tslint:disable-next-line:no-any
        projection: any = {}
    ): Promise<IUser[]> {
        let query: {} = {};
        if (idList.length) {
            query = { _id: { $in: idList } };
        }
        return await this._userModel
            .find(query, projection)
            .lean()
            .exec();
    }

    // tslint:disable-next-line: no-any
    public async devicesUser(id: string, userForUpdate: any): Promise<IUser | null> {
        return await this._userModel.findOneAndUpdate({ _id: id }, { $set: userForUpdate });
    }
}
