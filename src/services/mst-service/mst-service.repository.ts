import { Injectable, Logger } from "@nestjs/common";
import { UpdateWriteOpResult } from "mongoose";
import ServiceAttributes from "src/schemas/service/service.entity";
import Service, { ServiceDocument, ServiceModelExt} from "src/schemas/service/service.schema";





@Injectable()
export class ServiceRepository {

  private readonly ServiceModel: ServiceModelExt<ServiceDocument>
  protected readonly logger = new Logger(ServiceRepository.name);

  async updateOneWithQuery(
    query: Record<string, any>,
    update: Partial<ServiceAttributes>,
  ): Promise<UpdateWriteOpResult> {
    try {
      return await this.ServiceModel.updateOne(query, update);
    } catch (error) {
      // Puedes manejar el error de manera específica si es necesario
      throw error;
    }
  }

  async getDocumentByCode(code: string): Promise<ServiceAttributes> {
    return this.ServiceModel.findOne({ code }).lean().exec();
  }


  async createGenId(data: ServiceAttributes): Promise<ServiceAttributes> {
    const dataToCreate = new this.ServiceModel(data);
    const createdDocument = await dataToCreate.save();
    return createdDocument.toObject();
  }

  async getLastCode(): Promise<string> {
    const lastDocument = await this.ServiceModel.aggregate([
      {
        $project: {
          code: { $ifNull: ['$code', '020-0000000000'] },
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
      lastDocument.length > 0 ? lastDocument[0].code : '020-0000000000';

    return lastCode;
  }
}
