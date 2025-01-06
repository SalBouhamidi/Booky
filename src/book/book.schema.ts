import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongodb";
import * as mongoose from 'mongoose';
import {User} from "../user/user.schema"

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book{
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    administrator: User

    @Prop({required: true, maxlength:30})
    name: string;

    @Prop()
    author: string;

    @Prop({required: true, minlength:7})
    description: string;

    @Prop({required:true, default:false})
    isReserved: Boolean

    @Prop({required:false})
    imageUrl?: string;
}
export const BookSchema = SchemaFactory.createForClass(Book)