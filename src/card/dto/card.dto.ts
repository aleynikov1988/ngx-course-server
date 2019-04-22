import { ApiModelProperty } from '@nestjs/swagger';
import { CardStatus } from '../schemas/card.schema';

export class CreateCardDto {
    @ApiModelProperty({ required: false })
    public readonly _id?: string;
    @ApiModelProperty()
    public readonly description!: string;
    @ApiModelProperty()
    public readonly status!: CardStatus;
    @ApiModelProperty()
    // tslint:disable-next-line:no-any
    public owner!: any;
    @ApiModelProperty()
    public date!: Date;
}
