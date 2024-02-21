import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { DateErrors } from 'src/schemas/date/date.error';
import Dated, { DateDocument } from 'src/schemas/date/date.schema';
import { CreateDateDto } from './dto/create-date.dto';
import DateAttributes from 'src/schemas/date/date.entity';
import { DateRepository } from './trs-date.repository';
  
import { get } from 'lodash';

  @Injectable()
  export class DateService {
    constructor(private readonly dateRepository: DateRepository) {}
  
    async set(dataDto: CreateDateDto): Promise<DateAttributes> {
      try {
        const { name, telefono, servicio, separated } = dataDto;
        const lastCode = await this.dateRepository.getLastCode();
  
        const incrementar = (cadena: string) => {
          const parts = cadena.split('-');
          const left = parts[0];
          const right = String(Number(parts[1]) + 1).padStart(parts[1].length, '0');
          return `${left}-${right}`;
        };
  
        const nextCode = incrementar(lastCode);
  
        const dataToSave: DateAttributes = {
          name,
          telefono,
          servicio,
          separated,
          code: nextCode,
        };
  
        return this.dateRepository.createGenId(dataToSave);
      } catch (error) {
        console.log(error)
        throw new HttpException(
          {
            message: DateErrors.DATE_CREATE_ERROR,
            statusCode: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  



    async delete(code: string): Promise<void> {
        try {
          const existingDate = await this.dateRepository.getDocumentByCode(code);
    
          if (!existingDate) {
            throw new HttpException(
              {
                message: DateErrors.DATE_NOT_FOUND,
                statusCode: HttpStatus.BAD_REQUEST,
              },
              HttpStatus.BAD_REQUEST,
            );
          }
    
          const newDeleteStatus = existingDate.idDelete === '1' ? '0' : '1';
    
          await this.dateRepository.updateOneWithQuery(
            { code },
            { idDelete: newDeleteStatus },
          );
        } catch (error) {
          throw new HttpException(
            {
              message: DateErrors.DATE_DELETE_ERROR,
              statusCode: HttpStatus.BAD_REQUEST,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }
  
  
  
}
  
