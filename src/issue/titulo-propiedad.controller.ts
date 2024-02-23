import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TituloPropiedadService } from './titulo-propiedad.service';
import { CreateTituloPropiedadDto } from './dto/create-issue.dto';
import { UpdateTituloPropiedadDto } from './dto/update-issue.dto';

@Controller('titulo-propiedad')
export class TituloPropiedadController {
  constructor(private readonly tituloPropiedadService: TituloPropiedadService) {}

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
