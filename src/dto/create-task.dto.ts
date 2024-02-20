import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator'

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    cost?: number;

    @IsBoolean()
    @IsOptional()
    done?: boolean;
}