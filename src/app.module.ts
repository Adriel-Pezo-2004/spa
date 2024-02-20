import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DateModule } from './services/trs-date/trs-date.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/tasksdb'),
  DateModule],
})
export class AppModule {}
