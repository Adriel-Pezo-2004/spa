import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import ServiceAttributes from "../service/service.entity";
import { Type } from "class-transformer";
import { IDeletableModel } from "src/IDelete/IDelete.model";

export default class IssueAttributes extends IDeletableModel {
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
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    pago: string;

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