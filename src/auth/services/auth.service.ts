import * as jwt from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { ConfigService } from '../../config.service';
import { IUser, User } from '../schemas/user.schema';
import { UpdateUserDto, UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../../../dist/auth/dto/create-user.dto';

@Injectable()
export class AuthService {
    public constructor(
        @Inject('UserModelToken') private readonly _userModel: mongoose.Model<IUser>,
        private readonly _config: ConfigService
    ) {}

    public async createToken(user: UserDto): Promise<User> {
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

    public async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        return await this._userModel.create(createUserDto);
    }

    public async updateUser(createUserDto: User): Promise<IUser | null> {
        return await this._userModel.findOneAndUpdate({ username: createUserDto.username }, createUserDto, {
            new: true,
        });
    }

    public async getUser(query: Partial<User>): Promise<IUser | null> {
        return await this._userModel
            .findOne(query)
            .lean()
            .exec();
    }

    public async getUsers(query: User): Promise<User[] | null> {
        return await this._userModel
            .find(query, { _id: 1 })
            .lean()
            .exec();
    }
}
