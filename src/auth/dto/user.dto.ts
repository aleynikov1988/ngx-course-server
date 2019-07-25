import { ApiModelProperty } from '@nestjs/swagger';
import { IAddress, User } from '../schemas/user.schema';

export class UserDto {
    @ApiModelProperty()
    public readonly username!: string;
    @ApiModelProperty()
    public readonly email!: string;
    @ApiModelProperty()
    public password!: string;
}
// tslint:disable-next-line:max-classes-per-file
export class LoginDto {
    @ApiModelProperty()
    public readonly username!: string;
    @ApiModelProperty()
    public password!: string;
}
// tslint:disable-next-line:max-classes-per-file
export class UpdateUserDto {
    @ApiModelProperty()
    public readonly oldPass?: string;
    @ApiModelProperty()
    public pass?: string;
    @ApiModelProperty()
    public gender?: string;
    @ApiModelProperty()
    public name?: string;
    @ApiModelProperty()
    public surname?: string;
    @ApiModelProperty()
    public index?: string | number;
    @ApiModelProperty({ required: false })
    public address?: IAddress[];
}
