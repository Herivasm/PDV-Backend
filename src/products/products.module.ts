import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UploadImageService } from 'src/upload-image/upload-image.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, UploadImageService],
})
export class ProductsModule {}
