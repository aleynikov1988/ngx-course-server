import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';

export class CreateUserDto {
    @ApiModelProperty()
    public readonly username!: string;
    @ApiModelProperty()
    public readonly email!: string;
    @ApiModelProperty()
    public password!: string;
    @ApiModelProperty()
    public accessToken!: string;
    @ApiModelProperty({required: false})
    public address?: User[];
}
