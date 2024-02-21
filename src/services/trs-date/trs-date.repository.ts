import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection, UpdateWriteOpResult } from 'mongoose';
import { AbstractRepository } from 'src/methods/abstract.repository';
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
    private readonly DatedModel: DateModelExt<DateDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(DatedModel, connection);
  }

  async createGenId(data: DateAttributes): Promise<DateAttributes> {
    const dataToCreate = new this.DatedModel({
      name: data.name,
      telefono: data.telefono,
      servicio: data.servicio,
      separated: data.separated,
      code: data.code,
    });
    return await super.createGenId(dataToCreate);
  }
  async getLastCode(): Promise<string> {
    const lastDocument = await this.DatedModel.aggregate<DateAttributes>([
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
    query: Record<string, any>,
    update: Partial<DateAttributes>,
  ): Promise<UpdateWriteOpResult> {
    try {
      return await this.DatedModel.updateOne(query, update);
    } catch (error) {
      // Puedes manejar el error de manera específica si es necesario
      throw error;
    }
  }

  async getDocumentByCode(code: string): Promise<DateAttributes> {
    return this.DatedModel.findOne({ code }).lean().exec();
  }

  async generateNextCode(): Promise<string> {
    try {
      const lastDocument = await this.DatedModel
        .findOne({}, { code: 1 })  // Obtener solo el campo 'code'
        .sort({ code: -1 })       // Ordenar en orden descendente
        .limit(1)                 // Obtener solo el último documento
        .lean();                  // Obtener resultados como objetos JavaScript

      const lastCode = lastDocument?.code || '000000001-0000000000';

      // Lógica para incrementar el código
      const incrementar = (cadena: string): string => {
        const [left, right] = cadena.split('-');
        const incrementedRight = String(Number(right) + 1).padStart(right.length, '0');
        return '${left}-${incrementedRight}';
      };

      const nextCode = incrementar(lastCode);
      return nextCode;
    } catch (error) {
      this.logger.error('Error al generar el próximo código: ${error.message}');
      throw error;
    }
  }

}


   