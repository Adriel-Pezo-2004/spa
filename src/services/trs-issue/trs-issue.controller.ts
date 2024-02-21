import { Controller, Get, Post, Put, Delete, Body, Param, ConflictException, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import IssueAttributes from 'src/schemas/issue/issue.entity';
import { UpdateWriteOpResult } from 'mongoose';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { CreateIssueDto } from './dto/create-issue.dto';
import { IssueService } from './trs-isue.service';

@ApiTags('trs-date')
@Controller('trs-date')
export class IssueController {
  constructor(private readonly IssuedService: IssueService) {}
 
 

  @Delete('delete/:code')
  async delete(@Param('code') code: string): Promise<void> {
    await this.IssuedService.delete(code);
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
  async set(@Body() data: CreateIssueDto): Promise<IssueAttributes> {
    return this.IssuedService.set(data);
  }
  
}