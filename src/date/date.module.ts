import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dated } from './entities/date.entity';
import { DateService } from './date.service';
import { DateController } from './date.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([Dated])],
  controllers: [DateController],
  providers: [DateService],
})
export class DateModule {}
