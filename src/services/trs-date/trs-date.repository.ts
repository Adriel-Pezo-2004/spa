import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import DateAttributes from 'src/schemas/date/date.entity';
import Dated, { DateDocument } from 'src/schemas/date/date.schema';
import { CombinedFilter } from 'src/utils/query,util';

@Injectable()
export class DateRepository extends AbstractRepository<
    DateDocument,
  DateAttributes
> {
  protected readonly logger = new Logger(DateRepository.name);
  constructor(
    @InjectModel(Dated.name)
    private readonly DateModel: Model<DateDocument>,
    private readonly connection: Connection,
  ) {
    super(DateModel, connection);
  }
  async createGenId(data: DateAttributes): Promise<DateAttributes> {
    const dataToCreate = new this.DateModel({
      name: data.name,
      telefono: data.telefono,
      servicio: data.servicio,
      date: data.date,
      separated: data.separated,
      code: data.code,
    });
    return await super.createGenId(dataToCreate);
  }
  async getLastCode(): Promise<string> {
    const lastDocument = await this.DateModel.aggregate<DateAttributes>([
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
    ])
      .allowDiskUse(true)
      .read('secondaryPreferred');
    const lasCode =
      lastDocument.length > 0 ? lastDocument[0].code : '000000001-0000000000';
    return lasCode;
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
