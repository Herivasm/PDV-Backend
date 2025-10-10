import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class IdValidationPipe implements PipeTransform {
    transform(value: any) {
        if (!isNaN(value) && Number.isInteger(+value) && +value > 0) {
            return +value;
        }

        if (isUUID(value)) {
            return value;
        }

        throw new BadRequestException('ID no válido');
    }

}
