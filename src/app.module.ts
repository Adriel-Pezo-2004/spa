import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DateModule } from './services/trs-date/trs-date.module';
import { DateRepository } from './services/trs-date/trs-date.repository';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017'),
  DateModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
