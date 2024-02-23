import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicesService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServiceController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post(':serviceCode')
  create(
    @Param('serviceCode') serviceCode: string,
    @Body() createServiceDto: CreateServiceDto,
  ) {
    return this.servicesService.create(serviceCode, createServiceDto);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':serviceCode')
  findOne(@Param('serviceCode') serviceCode: string) {
    return this.servicesService.findOne(serviceCode);
  }

  @Patch(':serviceCode')
  update(
    @Param('serviceCode') serviceCode: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(serviceCode, updateServiceDto);
  }

  @Delete(':serviceCode')
  remove(@Param('serviceCode') serviceCode: string) {
    return this.servicesService.remove(serviceCode);
  }
}
