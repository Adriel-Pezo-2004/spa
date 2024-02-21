import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import ServiceAttributes from "../service/service.entity";
import { IDeletableModel } from "src/IDelete/IDelete.model";

export default class DateAttributes extends IDeletableModel{
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
        required: false,
        default: '1'
      })
    @IsString()
    @IsOptional()
    separated?: string;
}