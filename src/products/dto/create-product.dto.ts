import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateProductDto {
    @IsString({ message: 'Nombre no válido' })
    @IsNotEmpty({ message: 'El nombre del producto no puede ir vacío' })
    name: string;

    @IsString({ message: 'Imagen no válida' })
    @IsOptional()
    image?: string;

    @IsNotEmpty({ message: 'El precio del producto es obligatorio' })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Precio no válido' })
    price: number;

    @IsNotEmpty({ message: 'La cantidad de producto no puede ir vacía' })
    @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Cantidad no válida' })
    inventory: number;

    @IsNotEmpty({ message: 'La categoría del producto es obligatoria' })
    @IsInt({ message: 'Categoría no válida' })
    categoryId: number;

    @IsNotEmpty({ message: 'El proveedor del producto es obligatorio' })
    @IsUUID(4, { message: 'Proveedor no válido' })
    supplierId: string;
}
