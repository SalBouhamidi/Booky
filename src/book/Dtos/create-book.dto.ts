import {IsBoolean, IsDate, isDefined, IsDefined, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from 'mongoose';

export class createBookDtos{
@IsDefined({message:"teh name of the Event must be definded"})
@IsNotEmpty({message:"The name must is required"})
@IsString({message: "the name must be string"}) 
name:string

@IsNotEmpty({message:"the description is required"})
@IsString({message:"The Description must be a text"})
description:string

@IsOptional()
@IsMongoId()
administrator?:Types.ObjectId

@IsDefined({message: "the name of author must be there"})
author: string
@IsNotEmpty()
@IsBoolean()
isReserved: Boolean

@IsOptional()
file?: any;
}