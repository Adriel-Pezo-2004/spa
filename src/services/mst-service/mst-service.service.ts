import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import ServiceAttributes from "src/schemas/service/service.entity";
import { ServiceErrors } from "src/schemas/service/service.error";
import { ServiceRepository } from "./mst-service.repository";



@Injectable()
export class DateService {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async set(dataDto: CreateServiceDto): Promise<ServiceAttributes> {
    try {
      const { name, price, active } = dataDto;
      const lastCode = await this.serviceRepository.getLastCode();

      const incrementar = (cadena: string) => {
        const parts = cadena.split('-');
        const left = parts[0];
        const right = String(Number(parts[1]) + 1).padStart(parts[1].length, '0');
        return `${left}-${right}`;
      };

      const nextCode = incrementar(lastCode);

      const dataToSave: ServiceAttributes = {
        name,
        price,
        active,
        code: nextCode,
      };

      return this.serviceRepository.createGenId(dataToSave);
    } catch (error) {
      console.log(error)
      throw new HttpException(
        {
          message: ServiceErrors.SERVICE_CREATE_ERROR,
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }




  async delete(code: string): Promise<void> {
      try {
        const existingDate = await this.serviceRepository.getDocumentByCode(code);
  
        if (!existingDate) {
          throw new HttpException(
            {
              message: ServiceErrors.SERVICE_NOT_FOUND,
              statusCode: HttpStatus.BAD_REQUEST,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
  
        const newDeleteStatus = existingDate.idDelete === '1' ? '0' : '1';
  
        await this.serviceRepository.updateOneWithQuery(
          { code },
          { idDelete: newDeleteStatus },
        );
      } catch (error) {
        throw new HttpException(
          {
            message: ServiceErrors.SERVICE_DELETE_ERROR,
            statusCode: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }



}

