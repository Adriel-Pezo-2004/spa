import { Controller, Get, Post, Put, Delete, Body, Param, ConflictException, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import ServiceAttributes from 'src/schemas/service/service.entity';
import { UpdateWriteOpResult } from 'mongoose';
import { UpdateServiceDto } from './dto/update-service.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServiceService } from './mst-service.service';

@ApiTags('trs-date')
@Controller('trs-date')
export class ServiceController {
  constructor(private readonly ServicedService: ServiceService) {}
 
 

  @Delete('delete/:code')
  async delete(@Param('code') code: string): Promise<void> {
    await this.ServicedService.delete(code);
  }

 /* @Put('put/:code')
  async put(
    @Param('code') code: string,
    @Body() data: UpdateDateDto,
  ): Promise<any> {
    return this.DatedService.put(code, data);
  }*/

  //Post

  @Post('set')
  async set(@Body() data: CreateServiceDto): Promise<ServiceAttributes> {
    return this.ServicedService.set(data);
  }
  
}