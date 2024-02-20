import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { DateErrors } from 'src/schemas/date/date.error';
import Dated, { DateDocument } from 'src/schemas/date/date.schema';
import { CreateDateDto } from './dto/create-date.dto';
import DateAttributes from 'src/schemas/date/date.entity';
import { DateRepository } from './trs-date.repository';
import {
  andWhere,
  buildQuery,
  CombinedFilter,
  Normalizers,
  Ops,
  seed,
  where,
} from '../../utils/query,util';

import { get } from 'lodash';

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

  async delete(code: string): Promise<UpdateWriteOpResult> {
    try {
      const objExist: DateAttributes =
        await this.dateRepository.getDocument(
          buildQuery<DateAttributes>(
            where('code', code),
            andWhere('idDelete', 0),
          ),
        );
      if (!objExist) {
        throw new HttpException(
          {
            message: DateErrors.DATE_NOT_FOUND,
            statusCode: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const updateData: Partial<DateAttributes> = {
        idDelete: '1'
      };
      return await this.dateRepository.updateOneWithQuery(
        buildQuery<DateAttributes>(where('code', code)),
        updateData,
      );
    } catch (err) {
      throw get(err, 'status')
        ? err
        : new HttpException(
            {
              message: DateErrors.DATE_NOT_FOUND,
              statusCode: HttpStatus.BAD_REQUEST,
            },
            HttpStatus.BAD_REQUEST,
          );
    }
  }





}
