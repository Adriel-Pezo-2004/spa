import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNotEmpty, ValidateNested, IsObject, IsDate } from 'class-validator';
import ServiceAttributes from 'src/schemas/service/service.entity';

export class CreateServiceDto extends OmitType(ServiceAttributes, [
    'code',
] as const)  {
    @ApiProperty({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        required: false,
        default: '1'
      })
    @IsString()
    @IsOptional()
    active?: string;
} 