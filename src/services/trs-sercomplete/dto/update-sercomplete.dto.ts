import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsBoolean, IsOptional, IsNotEmpty, ValidateNested, IsObject, IsDate } from 'class-validator'
import SerCompleteAttributes from 'src/schemas/sercomplete/sercomplete.entity';
import ServiceAttributes from 'src/schemas/service/service.entity';

export class UpdateDateDto extends PartialType(
    OmitType(SerCompleteAttributes, ['code'] as const),
  ) {
      @ApiProperty({
          required: true,
          description: 'Id for old version'
      })
      @IsString()
      @IsNotEmpty()
      code?: String;
  
      @ApiProperty({
        required: true
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        required: true
    })
    @IsString()
    @IsNotEmpty()
    typeOfpay: string;

    @ApiProperty({
        type: ServiceAttributes,
        required: false,
    })
    @IsObject()
    @ValidateNested()
    @Type(() => ServiceAttributes)
    @IsOptional()
    servicio?: ServiceAttributes;
  }