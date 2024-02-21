import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateIssueDto } from "./dto/create-issue.dto";
import IssueAttributes from "src/schemas/issue/issue.entity";
import { IssueErrors } from "src/schemas/issue/issue.error";
import { IssueRepository } from "./trs-issue.repository";



@Injectable()
export class IssueService {
  constructor(private readonly issueRepository: IssueRepository) {}

  async set(dataDto: CreateIssueDto): Promise<IssueAttributes> {
    try {
      const { name, servicio, pago} = dataDto;
      const lastCode = await this.issueRepository.getLastCode();

      const incrementar = (cadena: string) => {
        const parts = cadena.split('-');
        const left = parts[0];
        const right = String(Number(parts[1]) + 1).padStart(parts[1].length, '0');
        return `${left}-${right}`;
      };

      const nextCode = incrementar(lastCode);

      const dataToSave: IssueAttributes = {
        name,
        pago,
        servicio,
        code: nextCode,
      };

      return this.issueRepository.createGenId(dataToSave);
    } catch (error) {
      console.log(error)
      throw new HttpException(
        {
          message: IssueErrors.ISSUE_CREATE_ERROR,
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }




  async delete(code: string): Promise<void> {
      try {
        const existingDate = await this.issueRepository.getDocumentByCode(code);
  
        if (!existingDate) {
          throw new HttpException(
            {
              message: IssueErrors.ISSUE_NOT_FOUND,
              statusCode: HttpStatus.BAD_REQUEST,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
  
        const newDeleteStatus = existingDate.idDelete === '1' ? '0' : '1';
  
        await this.issueRepository.updateOneWithQuery(
          { code },
          { idDelete: newDeleteStatus },
        );
      } catch (error) {
        throw new HttpException(
          {
            message: IssueErrors.ISSUE_DELETE_ERROR,
            statusCode: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }



}

