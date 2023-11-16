import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuctionModule } from './auction/auction.module';
import { BidModule } from './bid/bid.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URL),UserModule, AuctionModule, BidModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
