import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongodb';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';
import { Book } from '../book/book.schema';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true })
  book: Book;

  @Prop({ default: Date.now })
  borrowedAt: Date;

  @Prop({ default: null })
  returnedAt: Date;

  @Prop({default: false})
  isreturned: Boolean
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
