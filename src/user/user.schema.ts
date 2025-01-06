import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongodb";
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ required: true, maxlength: 30 })
    name: string;
    @Prop({ required: true, minlength: 7 })
    email: string;
    @Prop({ required: true })
    phone_number: string;
    @Prop({ required: true, minlength: 8 })
    password: string;
}
export const UserSchema = SchemaFactory.createForClass(User)