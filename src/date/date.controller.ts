import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IntervinientesService } from './date.service';
import { CreateIntervinienteDto } from './dto/create-date.dto';
import { UpdateIntervinienteDto } from './dto/update-date.dto';

@Controller('intervinientes')
export class IntervinientesController {
  constructor(private readonly intervinientesService: IntervinientesService) {}

  @Post(':id')
  create(@Param('id') idTitulo:string,@Body() createIntervinienteDto: CreateIntervinienteDto) {
    return this.intervinientesService.create(idTitulo,createIntervinienteDto);
  }

  @Get()
  findAll() {
    return this.intervinientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.intervinientesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIntervinienteDto: UpdateIntervinienteDto) {
    return this.intervinientesService.update(+id, updateIntervinienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.intervinientesService.remove(+id);
  }
}
