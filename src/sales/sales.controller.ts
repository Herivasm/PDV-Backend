import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation.pipe';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) { }

  @Post()
  create(
    @Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  findAll(@Query('date') saleDate?: string) {
    return this.salesService.findAll(saleDate);
  }

  @Get(':id')
  findOne(
    @Param('id', IdValidationPipe) id: string) {
    return this.salesService.findOne(id);
  }

  @Delete(':id')
  remove(
    @Param('id', IdValidationPipe) id: string) {
    return this.salesService.remove(id);
  }
}
