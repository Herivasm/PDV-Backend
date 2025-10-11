import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaClient } from 'generated/prisma';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CategoriesService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  create(createCategoryDto: CreateCategoryDto) {
    return this.category.create({
      data: createCategoryDto
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const totalPages = await this.category.count({});
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.category.findMany({
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

  async findOne(id: number) {
    const category = await this.category.findFirst({
      where: { id }
    });

    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const data = updateCategoryDto;

    await this.findOne(id);

    const category = await this.category.update({
      where: { id },
      data
    });

    return category;
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.category.delete({ where: { id } });
  }
}
