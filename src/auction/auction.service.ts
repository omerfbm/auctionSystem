import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auction, AuctionDocument } from './auction.model';
import { CreateAuctionDto } from './dto/create-auction.dto';

@Injectable()
export class AuctionService {
  constructor(@InjectModel(Auction.name) private auctionModel: Model<AuctionDocument>) {}

  async create(createAuctionDto: CreateAuctionDto): Promise<Auction> {
    const createdAuction = new this.auctionModel(createAuctionDto);
    return createdAuction.save();
  }

  async findAll(): Promise<Auction[]> {
    return this.auctionModel.find().exec();
  }

  async findOne(id: string): Promise<Auction> {
    const auction = await this.auctionModel.findById(id).exec();
    if (!auction) {
      throw new NotFoundException(`Auction with ID ${id} not found`);
    }
    return auction;
  }

}
