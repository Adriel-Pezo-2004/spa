import { Injectable, Logger } from "@nestjs/common";
import { UpdateWriteOpResult } from "mongoose";
import IssueAttributes from "src/schemas/issue/issue.entity";
import { IssueDocument, IssueModelExt } from "src/schemas/issue/issue.schema";





@Injectable()
export class IssueRepository {

  private readonly IssueModel: IssueModelExt<IssueDocument>
  protected readonly logger = new Logger(IssueRepository.name);

  async updateOneWithQuery(
    query: Record<string, any>,
    update: Partial<IssueAttributes>,
  ): Promise<UpdateWriteOpResult> {
    try {
      return await this.IssueModel.updateOne(query, update);
    } catch (error) {
      // Puedes manejar el error de manera específica si es necesario
      throw error;
    }
  }

  async getDocumentByCode(code: string): Promise<IssueAttributes> {
    return this.IssueModel.findOne({ code }).lean().exec();
  }


  async createGenId(data: IssueAttributes): Promise<IssueAttributes> {
    const dataToCreate = new this.IssueModel(data);
    const createdDocument = await dataToCreate.save();
    return createdDocument.toObject();
  }

  async getLastCode(): Promise<string> {
    const lastDocument = await this.IssueModel.aggregate([
      {
        $project: {
          code: { $ifNull: ['$code', '030-0000000000'] },
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
      lastDocument.length > 0 ? lastDocument[0].code : '030-0000000000';

    return lastCode;
  }
}
