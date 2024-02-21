import { Controller, Get, Post, Put, Delete, Body, Param, ConflictException, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import WorkersAttributes from 'src/schemas/workers/workers.entity';
import { UpdateWriteOpResult } from 'mongoose';
import { UpdateWorkersDto } from './dto/update-workers.dto';
import { CreateWorkersDto } from './dto/create-workers.dto';
import { WorkersService } from './mst-workers.service';

@ApiTags('trs-date')
@Controller('trs-date')
export class WorkersController {
  constructor(private readonly WorkedService: WorkersService) {}
 
 

  @Delete('delete/:code')
  async delete(@Param('code') code: string): Promise<void> {
    await this.WorkedService.delete(code);
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
  async set(@Body() data: CreateWorkersDto): Promise<WorkersAttributes> {
    return this.WorkedService.set(data);
  }
  
}