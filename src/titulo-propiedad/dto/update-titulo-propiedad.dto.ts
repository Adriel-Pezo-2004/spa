import { PartialType } from '@nestjs/mapped-types';
import { CreateTituloPropiedadDto } from './create-titulo-propiedad.dto';

export class UpdateTituloPropiedadDto extends PartialType(CreateTituloPropiedadDto) {}
