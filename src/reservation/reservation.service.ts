import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../book/book.schema';
import { Reservation, ReservationDocument } from './reservation.schema';
import {addReservationDtos} from "./DTOs/create-reservation.dto"

@Injectable()
export class ReservationService {
    constructor(
        @InjectModel(Reservation.name) private ReservationModel: Model<ReservationDocument>,
        @InjectModel(Book.name) private Bookmodel: Model<BookDocument>
    ){}
    async barrowBook(bookId, userId,addnewReservation: addReservationDtos ){
        try{
            let isBookexist = await this.Bookmodel.findOne({bookId});
            if(!isBookexist){
                return "Ops the Book is not "
            }
            if(isBookexist.isReserved){
                return "The Book is already reserved"
            }
            addnewReservation.user = userId;
            addnewReservation.book = bookId;
            addnewReservation.isreturned = true;
            let newReservation = new this.ReservationModel(addnewReservation);
            let createNewReservation = newReservation.save();
            if(createNewReservation){
                isBookexist.isReserved = true;
                isBookexist.save();
            }
            return createNewReservation;
        }catch(e){
            console.log("This is an error",e);
            return `thers an error; ${e}`
        }
    }
    async returnBook(bookId, userId){
        try{
            let isBookexist = await this.Bookmodel.findOne({bookId});
            if(!isBookexist){
                return "Ops the Book is not "
            }
            let findReservedBook = await this.ReservationModel.findOne({
                user: userId,
                book: bookId,
                isreturned:true
            });
            if(!findReservedBook){
                return "Ops reservation is not found please if you have returned the book, try again "
            }
            findReservedBook.isreturned = false;
            findReservedBook.save();

        }catch(e){
            console.log("This is an error",e);
            return `thers an error; ${e}`
        }
    }
}
