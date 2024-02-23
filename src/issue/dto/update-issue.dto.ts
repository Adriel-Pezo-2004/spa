import { PartialType } from '@nestjs/mapped-types';
import { CreateTituloPropiedadDto } from './create-issue.dto';

export class UpdateTituloPropiedadDto extends PartialType(CreateTituloPropiedadDto) {}
