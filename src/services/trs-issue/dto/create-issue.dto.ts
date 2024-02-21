import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNotEmpty, ValidateNested, IsObject, IsDate } from 'class-validator'
import IssueAttributes from 'src/schemas/issue/issue.entity';
import ServiceAttributes from 'src/schemas/service/service.entity';

export class CreateIssueDto extends OmitType(IssueAttributes, [
    'code',
] as const) {
   
    @ApiProperty({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        required: true,
        description: 'Pago efectivo-tarjeta-yape'
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
