import { IsString, IsBoolean, IsOptional } from 'class-validator'

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    cost?: number;

    @IsBoolean()
    @IsOptional()
    done?: boolean;
}