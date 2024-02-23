import { IsNotEmpty, IsString, IsNumber, Length } from 'class-validator';

export class CreateIssueDto {
  @IsNotEmpty()
  @IsString()
  issueCode: string;
  @IsNotEmpty()
  @IsString()
  datedCode: string;
  @IsNotEmpty()
  @IsNumber()
  pay: number;
}
