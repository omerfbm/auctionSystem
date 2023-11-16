import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Bid, BidDocument } from './bid.model';
import { CreateBidDto } from './dto/create-bid.dto';

@Injectable()
export class BidService {
  constructor(@InjectModel(Bid.name) private bidModel: Model<BidDocument>) {}

  async placeBid(createBidDto: CreateBidDto): Promise<Bid> {
    const placedBid = new this.bidModel(createBidDto);
    return placedBid.save();
  }

  async findBidByUser(id){
    return this.bidModel.find({UserID:id}).exec();
  }

  async findAllBids(): Promise<Bid[]> {
    return this.bidModel.find().exec();
  }
}
