import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [CategoriesModule, SuppliersModule, ProductsModule, SalesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
