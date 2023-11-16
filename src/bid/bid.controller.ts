import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { BidService } from './bid.service';
import { Bid } from './bid.model';
import { CreateBidDto } from './dto/create-bid.dto';

@Controller('bids')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Post()
  async placeBid(@Body() createBidDto: CreateBidDto): Promise<Bid> {
    return this.bidService.placeBid(createBidDto);
  }

  @Get(':id')
  bidByUser(@Param('id') id: string) {
    return this.bidService.findBidByUser(id);
  }

  @Get()
  async getAllBids(): Promise<Bid[]> {
    return this.bidService.findAllBids();
  }

}
