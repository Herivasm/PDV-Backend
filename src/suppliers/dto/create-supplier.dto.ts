import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class CreateSupplierDto {
    @IsNotEmpty({ message: 'El nombre del proveedor no puede ir vacío' })
    @IsString({ message: 'Nombre no válido' })
    name: string;

    @IsNotEmpty({ message: 'El contacto del proveedor no puede ir vacío' })
    @IsString({ message: 'Número no válido' })
    @Length(10, 10, { message: 'Inserte un número de teléfono válido' })
    contact: string;
}
