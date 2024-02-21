import { Injectable, Logger } from "@nestjs/common";
import { UpdateWriteOpResult } from "mongoose";
import WorkersAttributes from "src/schemas/workers/workers.entity";
import { WorkersDocument, WorkersModelExt } from "src/schemas/workers/workers.schema";



@Injectable()
export class WorkersRepository {

  private readonly ServiceModel: WorkersModelExt<WorkersDocument>
  protected readonly logger = new Logger(WorkersRepository.name);

  async updateOneWithQuery(
    query: Record<string, any>,
    update: Partial<WorkersAttributes>,
  ): Promise<UpdateWriteOpResult> {
    try {
      return await this.ServiceModel.updateOne(query, update);
    } catch (error) {
      // Puedes manejar el error de manera específica si es necesario
      throw error;
    }
  }

  async getDocumentByCode(code: string): Promise<WorkersAttributes> {
    return this.ServiceModel.findOne({ code }).lean().exec();
  }


  async createGenId(data: WorkersAttributes): Promise<WorkersAttributes> {
    const dataToCreate = new this.ServiceModel(data);
    const createdDocument = await dataToCreate.save();
    return createdDocument.toObject();
  }

  async getLastCode(): Promise<string> {
    const lastDocument = await this.ServiceModel.aggregate([
      {
        $project: {
          code: { $ifNull: ['$code', '200-0000000000'] },
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
      lastDocument.length > 0 ? lastDocument[0].code : '200-0000000000';

    return lastCode;
  }
}
