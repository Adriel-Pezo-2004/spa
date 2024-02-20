import { Module } from '@nestjs/common';
import { DateController } from './trs-date.controller';
import { DateService } from './trs-date.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { DateSchema } from 'src/schemas/date/date.schema';
import { DateRepository } from './trs-date.repository';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Date.name,
    schema: DateSchema,
  }],)],
  controllers: [DateController],
  providers: [DateService, DateRepository],
  exports: [DateRepository]
})
export class DateModule{}
