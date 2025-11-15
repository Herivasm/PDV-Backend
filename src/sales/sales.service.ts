import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { PrismaClient } from 'generated/prisma';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';

@Injectable()
export class SalesService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createSaleDto: CreateSaleDto) {
    await this.$transaction(async () => {
      const total = createSaleDto.items.reduce((total, item) => total + (item.price * item.quantity), 0);

      const sale = await this.sale.create({
        data: {
          total
        }
      });

      for (const item of createSaleDto.items) {
        const product = await this.product.findUnique({ where: { id: item.productId } });

        if (!product) {
          throw new BadRequestException(`Producto con ID ${item.productId} no encontrado`);
        }

        if (item.quantity > product.inventory) {
          throw new BadRequestException(`Inventario insuficiente para el producto con ID ${item.productId}`);
        }

        await this.saleItems.create({
          data: {
            price: item.price,
            quantity: item.quantity,
            productId: item.productId,
            saleId: sale.id
          }
        });

        await this.product.update({
          where: { id: item.productId },
          data: { inventory: product.inventory - item.quantity }
        });
      }
    });

    return { message: `Venta creada con éxito` };
  }

  findAll(saleDate?: string) {
    const where: any = {};

    if (saleDate) {
      const date = parseISO(saleDate);

      if (!isValid(date)) {
        throw new BadRequestException('Fecha inválida');
      }

      const start = startOfDay(date);
      const end = endOfDay(date);

      where.saleDate = {
        gte: start,
        lte: end
      }
    }

    return this.sale.findMany({
      where,
      include: {
        saleItems: {
          include: {
            product: true
          }
        }
      }
    });
  }

  async findOne(id: string) {
    const sale = await this.sale.findUnique({
      where: { id },
      include: { saleItems: true }
    })

    if (!sale) {
      throw new NotFoundException('Venta no encontrada');
    }

    return sale;
  }

  async remove(id: string) {
    const sale = await this.findOne(id);

    await this.$transaction(async () => {
      for (const item of sale.saleItems) {
        const product = await this.product.findUnique({ where: { id: item.productId } });

        if (product) {
          await this.product.update({
            where: { id: product.id },
            data: { inventory: product.inventory + item.quantity }
          });
        }
      }

      await this.saleItems.deleteMany({ where: { saleId: id } });
      await this.sale.delete({ where: { id } });
    });

    return 'Venta cancelada';
  }
}
