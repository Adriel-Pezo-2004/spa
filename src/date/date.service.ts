import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDateDto } from './dto/create-date.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dated } from './entities/date.entity';
import { UpdateDateDto } from './dto/update-date.dto';

@Injectable()
export class DateService {
  constructor(
    @InjectRepository(Dated)
    private datedRepository:Repository<Dated>,
   // private tituloPropiedadService: TituloPropiedadService, //issue
  ){}
  async create(idTitulo:string,createDateDto: CreateDateDto) {
    try {
      //const titulo = await this.tituloPropiedadService.findOne(idTitulo);
      const interviniente = await this.datedRepository.save(createDateDto);
     // titulo.intervinientes.push(interviniente);
      //return await this.tituloPropiedadService.guardar(titulo);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all dates`;
  }

  findOne(datedCode: string) {
    return `This action returns a #${datedCode} dates`;
  }

  update(datedCode: string, updateDateDto: UpdateDateDto) {
    return `This action updates a #${datedCode} date`;
  }

  remove(datedCode: string) {
    return `This action removes a #${datedCode} date`;
  }
}
