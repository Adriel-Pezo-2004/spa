import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection, UpdateWriteOpResult } from 'mongoose';
import DateAttributes from 'src/schemas/date/date.entity';
import Dated, { DateDocument, DateModelExt } from 'src/schemas/date/date.schema';

  

@Injectable()
  export class DateRepository{
    protected readonly logger = new Logger(DateRepository.name);
    private readonly DateModel: DateModelExt<DateDocument>
    


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
      const dataToCreate = new this.DateModel({
        name: data.name,
        telefono: data.telefono,
        servicio: data.servicio,
        separated: data.separated,
        code: data.code,
      });
      return await this.createGenId(dataToCreate);
    }
    async getLastCode(): Promise<string> {
      try {
        const lastDocument = await this.DateModel
          .find({})
          .sort({ code: -1 })
          .limit(1);
  
        const lastCode =
          lastDocument.length > 0 ? lastDocument[0].code : '01-0000000000';
  
        return lastCode;
      } catch (error) {
        console.error(error);  // Manejar el error según sea necesario
        return '01-0000000000'; // O proporcionar un valor predeterminado en caso de error
      }
    }
}
