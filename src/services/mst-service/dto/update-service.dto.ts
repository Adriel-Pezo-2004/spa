import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsBoolean, IsOptional, IsNotEmpty, ValidateNested, IsObject, IsDate } from 'class-validator'
import ServiceAttributes from 'src/schemas/service/service.entity';

export class UpdateServiceDto extends PartialType(
    OmitType(ServiceAttributes, ['code'] as const),
  ) {
      @ApiProperty({
          required: true,
          description: 'Id for old version'
      })
      @IsString()
      @IsNotEmpty()
      code?: String;
  
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