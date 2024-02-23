import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';

export class UpdateerviceDto extends PartialType(CreateServiceDto) {}
