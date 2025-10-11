import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createProductDto: CreateProductDto) {
    const { categoryId, supplierId, name, price, inventory, image } = createProductDto;

    const category = await this.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      throw new BadRequestException(`Categoría con ID ${categoryId} no encontrada`);
    }

    const supplier = await this.supplier.findUnique({ where: { id: supplierId } });
    if (!supplier) {
      throw new BadRequestException(`Proveedor con ID ${supplierId} no encontrado`);
    }

    return this.product.create({
      data: {
        name,
        price,
        inventory,
        image: image || '',
        categoryId,
        supplierId
      },
      include: {
        category: true,
        supplier: true
      }
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const totalPages = await this.product.count({});
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit
      }),
      meta: {
        totalPages,
        page,
        lastPage
      }
    }
  }

  async findOne(id: string) {
    const product = await this.product.findFirst({ where: { id } });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { categoryId, supplierId, name, price, inventory, image } = updateProductDto;

    await this.findOne(id);

    const category = await this.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      throw new BadRequestException(`Categoría con ID ${categoryId} no encontrada`);
    }

    const supplier = await this.supplier.findUnique({ where: { id: supplierId } });
    if (!supplier) {
      throw new BadRequestException(`Proveedor con ID ${supplierId} no encontrado`);
    }

    return this.product.update({
      where: { id },
      data: {
        name,
        price,
        inventory,
        image: image || '',
        categoryId,
        supplierId
      },
      include: {
        category: true,
        supplier: true
      }
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.product.delete({ where: { id } });
  }
}
