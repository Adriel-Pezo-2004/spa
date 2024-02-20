import { ApiProperty } from '@nestjs/swagger';
import {IsDate, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';
import ServiceAttributes from '../service/service.entity';
import { IDeletableModel } from 'src/IDelete/IDelete.model';

export default class SerCompleteAttributes extends IDeletableModel{
    @ApiProperty({
        required: true
    })
    @IsString()
    @IsNotEmpty()
    code?: string;

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