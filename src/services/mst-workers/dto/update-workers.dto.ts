import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty} from 'class-validator'
import WorkersAttributes from 'src/schemas/workers/workers.entity';

export class UpdateWorkersDto extends PartialType(
    OmitType(WorkersAttributes, ['code'] as const),
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
    name?: String;

    @ApiProperty({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    typeofpayment?: String;
  }