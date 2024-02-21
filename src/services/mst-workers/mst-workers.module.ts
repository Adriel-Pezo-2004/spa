import { Module } from '@nestjs/common';
import { WorkersController } from './mst-workers.controller';
import { WorkersService } from './mst-workers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { DateSchema } from 'src/schemas/date/date.schema';
import { WorkersRepository } from './mst-workers.repository';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Date.name,
    schema: DateSchema,
  }],)],
  controllers: [WorkersController],
  providers: [WorkersService, WorkersRepository],
  exports: [WorkersRepository]
})
export class DateModule{}
