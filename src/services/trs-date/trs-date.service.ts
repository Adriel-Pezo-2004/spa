import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DateErrors } from 'src/schemas/date/date.error';
import Dated, { DateDocument } from 'src/schemas/date/date.schema';

@Injectable()
export class DateService {
  constructor(
    @InjectModel(Dated.name)
    private readonly dateModel: Model<DateDocument>,
  ) {}

  async deleteDate(code: string): Promise<void> {
    try {
      const existingDate = await this.dateModel.findOne({ code, idDelete: '0' });

      if (!existingDate) {
        throw new HttpException(
          {
            message: DateErrors.DATE_NOT_FOUND,
            statusCode: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.dateModel.updateOne({ code }, { idDelete: '1' });
    } catch (error) {
      throw new HttpException(
        {
          message: DateErrors.DATE_DELETE_ERROR,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}