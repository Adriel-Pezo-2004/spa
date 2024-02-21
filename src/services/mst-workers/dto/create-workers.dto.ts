import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator'
import WorkersAttributes from 'src/schemas/workers/workers.entity';

export class CreateWorkersDto extends OmitType(WorkersAttributes, [
    'code',
] as const) {
   
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
