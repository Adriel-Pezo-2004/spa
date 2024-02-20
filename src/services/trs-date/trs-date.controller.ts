import { Controller, Get, Post, Put, Delete, Body, Param, ConflictException, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import DateAttributes from 'src/schemas/date/date.entity';
import { UpdateWriteOpResult } from 'mongoose';
import { UpdateDateDto } from './dto/update-date.dto';
import { CreateDateDto } from './dto/create-date.dto';


@ApiTags('trs-date')
@Controller('trs-date')
export class DateController {
  constructor(private readonly DateService: DateService) {}
 
  @Get('get/:code')
  get_one(@Param('code') code: string): Promise<DateAttributes> {
    return this.DateService.get_one(code);
  }

  @Delete('delete/:code')
  async delet(@Param('code') code: string): Promise<UpdateWriteOpResult> {
    return this.DateService.delet(code);
  }

  @Put('put/:code')
  async put(
    @Param('code') code: string,
    @Body() data: UpdateDateDto,
  ): Promise<any> {
    return this.DateService.put(code, data);
  }

  //Post

  @Post('set')
  async set(@Body() data: CreateDateDto): Promise<DateAttributes> {
    return this.DateService.set(data);
  }
  
}
