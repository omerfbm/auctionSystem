import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionController } from './auction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auction, AuctionSchema } from './auction.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auction.name, schema: AuctionSchema }])],
  controllers: [AuctionController],
  providers: [AuctionService],
})
export class AuctionModule {}
