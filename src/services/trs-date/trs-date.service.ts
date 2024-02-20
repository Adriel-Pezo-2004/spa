import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DateErrors } from 'src/schemas/date/date.error';
import Dated, { DateDocument } from 'src/schemas/date/date.schema';
import { CreateDateDto } from './dto/create-date.dto';
import DateAttributes from 'src/schemas/date/date.entity';
import { DateRepository } from './trs-date.repository';

@Injectable()
export class DateService {
  constructor(private readonly dateRepository: DateRepository) {}

  async set(dataDto: CreateDateDto): Promise<DateAttributes> {
    try {
      const { name, telefono, servicio, date, separated } = dataDto;
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
        date,
        separated,
        code: nextCode,
      };

      return this.dateRepository.createGenId(dataToSave);
    } catch (error) {
      throw new HttpException(
        {
          message: DateErrors.DATE_CREATE_ERROR,
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }





}
