import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Connection, UpdateWriteOpResult } from 'mongoose';
import DateAttributes from 'src/schemas/date/date.entity';
import Dated, { DateDocument, DateModelExt } from 'src/schemas/date/date.schema';

@Injectable()
export class DateRepository {

  private readonly DateModel: DateModelExt<DateDocument>
  protected readonly logger = new Logger(DateRepository.name);

  async updateOneWithQuery(
    query: Record<string, any>,
    update: Partial<DateAttributes>,
  ): Promise<UpdateWriteOpResult> {
    try {
      return await this.DateModel.updateOne(query, update);
    } catch (error) {
      // Puedes manejar el error de manera específica si es necesario
      throw error;
    }
  }

  async getDocumentByCode(code: string): Promise<DateAttributes> {
    return this.DateModel.findOne({ code }).lean().exec();
  }


  async createGenId(data: DateAttributes): Promise<DateAttributes> {
    const dataToCreate = new this.DateModel(data);
    const createdDocument = await dataToCreate.save();
    return createdDocument.toObject();
  }

  async getLastCode(): Promise<string> {
    const lastDocument = await this.DateModel.aggregate([
      {
        $project: {
          code: { $ifNull: ['$code', '010-0000000000'] },
          secondNumber: {
            $cond: [
              { $eq: [{ $substr: ['$code', 3, 10] }, ''] },
              0,
              { $toInt: { $substr: ['$code', 3, 10] } },
            ],
          },
        },
      },
      {
        $sort: {
          secondNumber: -1,
        },
      },
      {
        $limit: 1,
      },
    ]).allowDiskUse(true).read('secondaryPreferred');

    const lastCode =
      lastDocument.length > 0 ? lastDocument[0].code : '010-0000000000';

    return lastCode;
  }
}
