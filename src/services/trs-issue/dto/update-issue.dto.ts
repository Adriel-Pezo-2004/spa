import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsBoolean, IsOptional, IsNotEmpty, ValidateNested, IsObject, IsDate } from 'class-validator'
import IssueAttributes from 'src/schemas/issue/issue.entity';
import ServiceAttributes from 'src/schemas/service/service.entity';

export class UpdateIssueDto extends PartialType(
    OmitType(IssueAttributes, ['code'] as const),
  ) {
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