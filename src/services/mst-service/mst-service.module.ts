import { Module } from '@nestjs/common';
import { ServiceController } from './mst-service.controller';
import { ServiceService } from './mst-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { DateSchema } from 'src/schemas/date/date.schema';
import { ServiceRepository } from './mst-service.repository';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Date.name,
    schema: DateSchema,
  }],)],
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository],
  exports: [ServiceRepository]
})
export class ServiceModule{}
