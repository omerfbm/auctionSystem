import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  UserName: string;

  @Prop()
  Role: string;

  @Prop()
  Email: string;

  @Prop()
  Password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
