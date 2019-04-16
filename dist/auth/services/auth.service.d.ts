import { Model } from 'mongoose';
import { IUser, User } from '../schemas/user.schema';
import { ConfigService } from 'src/config.service';
export declare class AuthService {
    private readonly _userModel;
    private readonly _config;
    constructor(_userModel: Model<IUser>, _config: ConfigService);
    createToken(user: IUser): Promise<User>;
    validateUser(username: string): Promise<boolean>;
    createUser(createUserDto: any): Promise<IUser>;
    getUser(query: any): Promise<IUser | null>;
    getUserWithToken(query: any): Promise<User>;
}
