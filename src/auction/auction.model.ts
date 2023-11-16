import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuctionDocument = Auction & Document;

@Schema()
export class Auction {
  @Prop()
  Title: string;

  @Prop()
  Description: string;

  @Prop()
  StartDate: Date;

  @Prop()
  EndDate: Date;

  // Additional properties and relationships can be added as needed
}

export const AuctionSchema = SchemaFactory.createForClass(Auction);
