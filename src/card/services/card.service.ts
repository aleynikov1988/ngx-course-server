import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { ICard } from '../schemas/card.schema';
import { CreateCardDto } from '../dto/card.dto';


@Injectable()
export class CardService {
  public constructor(
    @Inject('cardModel') private readonly _cardModel: Model<ICard>,
  ) {}

  public async createCard(query: CreateCardDto): Promise<ICard | null> {
    return await this._cardModel.create(query);
  }

  public async getCardById(query: { _id: mongoose.Types.ObjectId }, _projection: {} = {} ): Promise<ICard | null> {
    return await this._cardModel.findOne(query, _projection)
      .lean()
      .exec();
  }

  public async getAllCards(query: {} = {}, _projection: {} = {}): Promise<ICard[] | null> {
    return await this._cardModel.find(query, _projection)
      .lean()
      .exec();
  }

  public async deleteCard(query: { _id: mongoose.Types.ObjectId }): Promise<ICard | null> {
    return await this._cardModel.findOneAndDelete(query)
      .lean()
      .exec();
  }

  public async updateCard(query: { _id: mongoose.Types.ObjectId }, body: CreateCardDto): Promise<ICard | null> {
    return await this._cardModel.findOneAndUpdate(query, body)
      .lean()
      .exec();
  }
}
