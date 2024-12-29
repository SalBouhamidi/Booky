import {IsBoolean, IsDate, isDefined, IsDefined, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from 'mongoose';

export class addReservationDtos{
@IsOptional()
@IsMongoId()
user?:Types.ObjectId

@IsOptional()
@IsMongoId()
book?:Types.ObjectId

@IsDate()
@IsNotEmpty()
borrowedAt: Date;

@IsDate()
@IsNotEmpty()
returnedAt: Date;

@IsNotEmpty()
isreturned: Boolean
}