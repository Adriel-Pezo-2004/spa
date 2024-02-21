import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import WorkersAttributes from "src/schemas/workers/workers.entity";
import { CreateWorkersDto } from "./dto/create-workers.dto";
import { WorkersErrors } from "src/schemas/workers/workers.error";
import { WorkersRepository } from "./mst-workers.repository";


@Injectable()
export class WorkersService {
  constructor(private readonly workersRepository: WorkersRepository) {}

  async set(dataDto: CreateWorkersDto): Promise<WorkersAttributes> {
    try {
      const { name, typeofpayment } = dataDto;
      const lastCode = await this.workersRepository.getLastCode();

      const incrementar = (cadena: string) => {
        const parts = cadena.split('-');
        const left = parts[0];
        const right = String(Number(parts[1]) + 1).padStart(parts[1].length, '0');
        return `${left}-${right}`;
      };

      const nextCode = incrementar(lastCode);

      const dataToSave: WorkersAttributes = {
        name,
        typeofpayment,
        code: nextCode,
      };

      return this.workersRepository.createGenId(dataToSave);
    } catch (error) {
      console.log(error)
      throw new HttpException(
        {
          message: WorkersErrors.WORKERS_CREATE_ERROR,
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }




  async delete(code: string): Promise<void> {
      try {
        const existingDate = await this.workersRepository.getDocumentByCode(code);
  
        if (!existingDate) {
          throw new HttpException(
            {
              message: WorkersErrors.WORKERS_NOT_FOUND,
              statusCode: HttpStatus.BAD_REQUEST,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
  
        const newDeleteStatus = existingDate.idDelete === '1' ? '0' : '1';
  
        await this.workersRepository.updateOneWithQuery(
          { code },
          { idDelete: newDeleteStatus },
        );
      } catch (error) {
        throw new HttpException(
          {
            message: WorkersErrors.WORKERS_DELETE_ERROR,
            statusCode: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }



}

