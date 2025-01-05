import { Expose, Exclude} from "class-transformer";
import { Types } from "mongoose";

@Exclude()
export class responseBookDtos{
    @Expose()
    name:string
    @Expose()
    description:string
    @Expose()
    author: string
    @Expose()
    isReserved: boolean
    @Expose()
    readonly message: string = "Book was created successfully";
}