import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BidDocument = Bid & Document;

@Schema()
export class Bid {
 @Prop()
  AuctionID: string;

  @Prop()
  UserID: string;

  @Prop()
  Amount: number;
}

export const BidSchema = SchemaFactory.createForClass(Bid);