import { ApiProperty } from '@nestjs/swagger';
import {IsDate, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export default class WorkersAttributes {
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
    name?: String;

    @ApiProperty({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    typeofpayment?: String;
}