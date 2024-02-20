import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import DateAttributes from 'src/schemas/date/date.entity';
import Dated, { DateDocument } from 'src/schemas/date/date.schema';
import { CombinedFilter } from 'src/utils/query,util';

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

  async updateOneWithQuery(
    props: CombinedFilter<DateAttributes>,
    data: Partial<DateAttributes>,
    user?: any,
    options?: any,
  ): Promise<DateAttributes> {
    if (options && options.new === true) {
    }
    return await this.DateModel.updateOneWithQuery(props, data, user, options);
  }

}
