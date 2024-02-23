import { Module } from '@nestjs/common';
import { ServicesService } from './service.service';
import {  ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Servicio } from './entities/service.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Servicio])],
  controllers: [ServiceController],
  providers: [ServicesService],
})
export class ServicesModule {}
