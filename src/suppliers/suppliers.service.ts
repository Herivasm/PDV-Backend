import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaClient } from 'generated/prisma';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class SuppliersService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(createSupplierDto: CreateSupplierDto) {
    return this.supplier.create({
      data: createSupplierDto
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const totalPages = await this.supplier.count({});
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.supplier.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        totalPages,
        page,
        lastPage
      }
    }
  }

  async findOne(id: string) {
    const supplier = await this.supplier.findFirst({
      where: { id }
    });

    if (!supplier) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    return supplier;
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const data = updateSupplierDto;

    await this.findOne(id);

    const supplier = await this.supplier.update({
      where: { id },
      data
    });

    return supplier;
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.supplier.delete({ where: { id } });
  }
}
