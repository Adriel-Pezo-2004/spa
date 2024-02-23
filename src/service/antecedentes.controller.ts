import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AntecedentesService } from './antecedentes.service';
import { CreateAntecedenteDto } from './dto/create-service.dto';
import { UpdateAntecedenteDto } from './dto/update-service.dto';

@Controller('antecedentes')
export class AntecedentesController {
  constructor(private readonly antecedentesService: AntecedentesService) {}

  @Post(':idTitulo')
  create(
    @Param('idTitulo') idTitulo: string,
    @Body() createAntecedenteDto: CreateAntecedenteDto,
  ) {
    return this.antecedentesService.create(idTitulo, createAntecedenteDto);
  }

  @Get()
  findAll() {
    return this.antecedentesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.antecedentesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAntecedenteDto: UpdateAntecedenteDto,
  ) {
    return this.antecedentesService.update(+id, updateAntecedenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.antecedentesService.remove(+id);
  }
}
