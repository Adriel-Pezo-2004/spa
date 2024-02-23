import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDateDto {
    @IsNotEmpty()
    @IsString()
    datedCode: string;
    @IsNotEmpty()
    @IsString()
    serviceCode: string;
    @IsNotEmpty()
    @IsString()
    nameClient: string;
}
