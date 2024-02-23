import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDateDto {
    @IsNotEmpty()
    @IsString()
    DateCode: string;
    @IsNotEmpty()
    @IsString()
    serviceCode: string;
    @IsNotEmpty()
    @IsString()
    nameClient: string;
    @IsNotEmpty()
    @IsString()
    telefono: string;
}
