import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import ServiceAttributes from "../service/service.entity";

export default class DateAttributes {
    @ApiProperty({
        required: true,
        description: 'Id for old version'
    })
    @IsString()
    @IsNotEmpty()
    code?: string;

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
        required: true,
    })
    @IsDate()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({
        required: false,
        default: '1'
      })
    @IsString()
    @IsOptional()
    separated?: string;
}