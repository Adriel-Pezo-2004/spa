import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import DateAttributes from 'src/schemas/date/date.entity';
import Dated, { DateDocument } from 'src/schemas/date/date.schema';

@Injectable()
export class DateRepository {
  protected readonly logger = new Logger(DateRepository.name);

  constructor(
    @InjectModel(Dated.name)
    private readonly DateModel: Model<DateDocument>,
    private readonly connection: Connection,
  ) {}

  async createGenId(data: DateAttributes): Promise<DateAttributes> {
    const dataToCreate = new this.DateModel(data);
    const createdDocument = await dataToCreate.save();
    return createdDocument.toObject();
  }

  async getLastCode(): Promise<string> {
    const lastDocument = await this.DateModel.aggregate([
      {
        $project: {
          code: { $ifNull: ['$code', '000000001-0000000000'] },
          secondNumber: {
            $cond: [
              { $eq: [{ $substr: ['$code', 10, 10] }, ''] },
              0,
              { $toInt: { $substr: ['$code', 10, 10] } },
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
      lastDocument.length > 0 ? lastDocument[0].code : '000000001-0000000000';

    return lastCode;
  }
}
