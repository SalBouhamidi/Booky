import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { ReservationModule } from './reservation/reservation.module';
import { S3Service } from './common/services/s3/s3.service';




@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    BookModule,
    UserModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3Service],
  exports: [S3Service]
})
export class AppModule {}
