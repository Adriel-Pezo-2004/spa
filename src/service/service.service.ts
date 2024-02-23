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
    private servicioRepository:Repository<Servicio>,
    //private tituloPropiedadService:TituloPropiedadService
  ){

  }
  async create(serviceCode:string,createServiceDto: CreateServiceDto) {
    try {
      const { name, price } = createServiceDto;
      const nuevoServicio = this.servicioRepository.create({
        serviceCode,
        name,
        price,

      });

      // Guarda el nuevo servicio en la base de datos
      const servicioCreado = await this.servicioRepository.save(nuevoServicio);

      return servicioCreado;
    } catch (error) {
      // Maneja los errores 
      console.error(error);
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
