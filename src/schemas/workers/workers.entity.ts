import { ApiProperty } from '@nestjs/swagger';
import {IsDate, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { IDeletableModel } from 'src/IDelete/IDelete.model';

export default class WorkersAttributes extends IDeletableModel{
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