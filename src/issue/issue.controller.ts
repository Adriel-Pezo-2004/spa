import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Post()
  create(@Body() createTituloPropiedadDto: CreateIssueDto) {
    return this.issueService.create(createTituloPropiedadDto);
  }

  @Get()
  findAll() {
    return this.issueService.findAll();
  }

  @Get(':issueCode')
  findOne(@Param('issueCode') id: string) {
    return this.issueService.findOne(id);
  }

  @Patch(':issueCode')
  update(@Param('issueCode') issueCode: string, @Body() updateIssueDto: UpdateIssueDto) {
    return this.issueService.update(issueCode, updateIssueDto);
  }

  @Delete(':issueCode')
  remove(@Param('issueCode') issueCode: string) {
    return this.issueService.remove(issueCode);
  }
}
