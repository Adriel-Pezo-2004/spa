import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAntecedenteDto } from './dto/create-service.dto';
import { UpdateAntecedenteDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Antecedente } from './entities/service.entity';
import { Repository } from 'typeorm';
import { TituloPropiedadService } from '../titulo-propiedad/titulo-propiedad.service';

@Injectable()
export class AntecedentesService {
  constructor(
    @InjectRepository(Antecedente)
    private antecedenteRepository:Repository<Antecedente>,
    private tituloPropiedadService:TituloPropiedadService
  ){

  }



  async create(idTitulo:string,createAntecedenteDto: CreateAntecedenteDto) {
    try{
      const titulo=await this.tituloPropiedadService.findOne(idTitulo)
      const antecedente=await this.antecedenteRepository.save(createAntecedenteDto)
      titulo.antecedente=antecedente;
      return await this.tituloPropiedadService.guardar(titulo)

    }catch(error){

        throw new InternalServerErrorException()
    }
  }

  findAll() {
    return `This action returns all antecedentes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} antecedente`;
  }

  update(id: number, updateAntecedenteDto: UpdateAntecedenteDto) {
    return `This action updates a #${id} antecedente`;
  }

  remove(id: number) {
    return `This action removes a #${id} antecedente`;
  }
}
