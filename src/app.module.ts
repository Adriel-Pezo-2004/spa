import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DateModule } from './services/trs-date/trs-date.module';
import { ServiceModule } from './services/mst-service/mst-service.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/budadb'),
  DateModule,ServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
