import { IsNotEmpty, IsString, IsNumber, Length, IsDecimal } from 'class-validator';

export class CreateIssueDto {
  @IsNotEmpty()
  @IsString()
  issueCode: string;
  @IsNotEmpty()
  @IsString()
  datedCode: string;
  @IsNotEmpty()
  @IsDecimal()
  pay: number;
}
