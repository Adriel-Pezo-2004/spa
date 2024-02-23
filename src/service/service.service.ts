import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Servicio)
    private antecedenteRepository:Repository<Servicio>,
    //private tituloPropiedadService:TituloPropiedadService
  ){

  }



  async create(serviceCode:string,createServiceDto: CreateServiceDto) {
    try{
      //const titulo=await this.tituloPropiedadService.findOne(idTitulo)
      //const antecedente=await this.antecedenteRepository.save(createAntecedenteDto)
      //titulo.antecedente=antecedente;
      //return await this.tituloPropiedadService.guardar(titulo)

    }catch(error){

        throw new InternalServerErrorException()
    }
  }

  findAll() {
    return `This action returns all services`;
  }

  findOne(serviceCode: string) {
    return `This action returns a #${serviceCode} antecedente`;
  }

  update(serviceCode: string, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${serviceCode} antecedente`;
  }

  remove(serviceCode: string) {
    return `This action removes a #${serviceCode} antecedente`;
  }
}
