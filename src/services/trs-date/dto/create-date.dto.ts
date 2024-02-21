import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNotEmpty, ValidateNested, IsObject, IsDate } from 'class-validator'
import DateAttributes from 'src/schemas/date/date.entity';
import ServiceAttributes from 'src/schemas/service/service.entity';

export class CreateDateDto extends OmitType(DateAttributes, [
    'code',
] as const) {
   
    @ApiProperty({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        required: false,
    })
    @IsString()
    @IsNotEmpty()
    telefono: number;

    @ApiProperty({
        type: ServiceAttributes,
        required: false,
    })
    @IsObject()
    @ValidateNested()
    @Type(() => ServiceAttributes)
    @IsOptional()
    servicio: ServiceAttributes;


    @ApiProperty({
        required: false,
        default: '1'
      })
    @IsString()
    @IsOptional()
    separated?: string;
}
