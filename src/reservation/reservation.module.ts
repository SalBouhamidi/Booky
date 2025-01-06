import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './reservation.schema';
import { BookModule } from '../book/book.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reservation.name, schema:ReservationSchema }]),BookModule,],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
