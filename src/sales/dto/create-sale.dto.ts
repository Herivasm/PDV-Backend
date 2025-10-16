import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsNumber, IsPositive, IsUUID, ValidateNested } from "class-validator";

export class SaleItemsDto {
    @IsUUID(4, { message: 'ID no válido' })
    @IsNotEmpty({ message: 'El ID del producto es obligatorio' })
    productId: string;

    @IsNotEmpty({ message: 'La cantidad es obligatoria' })
    @IsInt({ message: 'La cantidad debe ser un número entero' })
    quantity: number;

    @IsNotEmpty({ message: 'El precio es obligatorio' })
    @IsNumber({}, { message: 'El precio debe ser un número' })
    @IsPositive({ message: 'El precio debe ser un número positivo' })
    price: number;
}

export class CreateSaleDto {
    @IsNotEmpty({ message: 'El total es obligatorio' })
    @IsNumber({}, { message: 'El total debe ser un número' })
    @IsPositive({ message: 'El total debe ser un número positivo' })
    total: number;

    @IsArray({ message: 'Los items deben ser un arreglo' })
    @ArrayNotEmpty({ message: 'Los items no pueden estar vacíos' })
    @ValidateNested({ each: true })
    @Type(() => SaleItemsDto)
    items: SaleItemsDto[];
}
