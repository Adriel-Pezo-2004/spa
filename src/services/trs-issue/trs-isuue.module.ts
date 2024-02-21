import { Module } from '@nestjs/common';
import { IssueController } from './trs-issue.controller';
import { IssueService } from './trs-isue.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { DateSchema } from 'src/schemas/date/date.schema';
import { IssueRepository } from './trs-issue.repository';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Date.name,
    schema: DateSchema,
  }],)],
  controllers: [IssueController],
  providers: [IssueService, IssueRepository],
  exports: [IssueRepository]
})
export class DateModule{}
