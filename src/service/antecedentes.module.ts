import { Module } from '@nestjs/common';
import { AntecedentesService } from './service.service';
import { AntecedentesController } from './antecedentes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Antecedente } from './entities/service.entity';
import { TituloPropiedadModule } from 'src/titulo-propiedad/titulo-propiedad.module';

@Module({
  imports:[
    TituloPropiedadModule,
    TypeOrmModule.forFeature([Antecedente])],
  controllers: [AntecedentesController],
  providers: [AntecedentesService],
})
export class AntecedentesModule {}
