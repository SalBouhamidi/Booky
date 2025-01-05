import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { BookService } from '../book/book.service';
import {addReservationDtos} from "./DTOs/create-reservation.dto"

@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService,
    ) { }

    @Post()
    async borowBook (@Param('bookId') bookId:string, @Param('userId') userId:string, @Body() addReservation: addReservationDtos){
        try{
            return await this.reservationService.barrowBook(bookId, userId, addReservation);
        }catch(e){
            console.log('an Error',e);
            return `Ops there's an error ${e}`
        }
    }

    @Get()
    async returnBook(@Param('bookId') bookId:string, @Param('userId') userId:string){
        try{
            return await this.reservationService.returnBook(bookId, userId);

        }catch(e){
                        console.log('an Error',e);
            return `Ops there's an error ${e}`
        }
    }




}
