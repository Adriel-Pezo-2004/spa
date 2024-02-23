import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TituloPropiedadService } from './issue.service';
import { CreateTituloPropiedadDto } from './dto/create-issue.dto';
import { UpdateTituloPropiedadDto } from './dto/update-issue.dto';

@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Post()
  create(@Body() createTituloPropiedadDto: CreateTituloPropiedadDto) {
    return this.tituloPropiedadService.create(createTituloPropiedadDto);
  }

  @Get()
  findAll() {
    return this.tituloPropiedadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tituloPropiedadService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTituloPropiedadDto: UpdateTituloPropiedadDto) {
    return this.tituloPropiedadService.update(+id, updateTituloPropiedadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tituloPropiedadService.remove(+id);
  }
}
