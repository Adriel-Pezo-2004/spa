import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DateService } from './date.service';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';


@Controller('date')
export class DateController {
  constructor(private readonly dateService: DateService) {}

  @Post(':datedCode')
  create(@Param('datedCode') datedCode:string,@Body() createDateDto: CreateDateDto) {
    return this.dateService.create(datedCode,createDateDto);
  }

  @Get()
  findAll() {
    return this.dateService.findAll();
  }

  @Get(':datedCode')
  findOne(@Param('datedCode') datedCode: string) {
    return this.dateService.findOne(datedCode);
  }

  @Patch(':datedCode')
  update(@Param('datedCode') datedCode: string, @Body() updateDateDto: UpdateDateDto) {
    return this.dateService.update(datedCode, updateDateDto);
  }

  @Delete(':datedCode')
  remove(@Param('datedCode') datedCode: string) {
    return this.dateService.remove(datedCode);
  }
}
