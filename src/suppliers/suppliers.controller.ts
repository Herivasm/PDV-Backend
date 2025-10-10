import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation.pipe';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) { }

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto
  ) {
    return this.suppliersService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.suppliersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', IdValidationPipe) id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.suppliersService.remove(id);
  }
}
