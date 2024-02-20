import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString} from 'class-validator';

export default class ServiceAttributes{
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
    price: number;

    @ApiProperty({
        required: false,
        default: '1'
      })
    @IsString()
    @IsOptional()
    active?: string;
}