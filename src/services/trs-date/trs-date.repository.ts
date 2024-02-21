import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection, UpdateWriteOpResult } from 'mongoose';
import DateAttributes from 'src/schemas/date/date.entity';
import Dated, { DateDocument, DateModelExt } from 'src/schemas/date/date.schema';

  

@Injectable()
export class DateRepository extends AbstractRepository<
    DateDocument,
  DateAttributes
> {
  protected readonly logger = new Logger(DateRepository.name);

  constructor(
    @InjectModel(Dated.name)
    private readonly DateModel: DateModelExt<DateDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(DateModel, connection);
  }
  async createGenId(data: DateAttributes): Promise<DateAttributes> {
    const dataToCreate = new this.DateModel({
      name: data.name,
      telefono: data.telefono,
      servicio: data.servicio,
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
}