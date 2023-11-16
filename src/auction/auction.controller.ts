import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { Auction } from './auction.model';
import { CreateAuctionDto } from './dto/create-auction.dto';

@Controller('auctions')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Post()
  async createAuction(@Body() createAuctionDto: CreateAuctionDto): Promise<Auction> {
    return this.auctionService.create(createAuctionDto);
  }

  @Get()
  async getAuctions(): Promise<Auction[]> {
    return this.auctionService.findAll();
  }

  @Get(':id')
  async getAuctionById(@Param('id') id: string): Promise<Auction> {
    return this.auctionService.findOne(id);
  }

}
