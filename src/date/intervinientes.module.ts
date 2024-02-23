import { Module } from '@nestjs/common';
import { IntervinientesService } from './intervinientes.service';
import { IntervinientesController } from './intervinientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interviniente } from './entities/date.entity';
import { TituloPropiedadModule } from 'src/titulo-propiedad/titulo-propiedad.module';

@Module({
  imports:[
    TituloPropiedadModule,
    TypeOrmModule.forFeature([Interviniente])],
  controllers: [IntervinientesController],
  providers: [IntervinientesService],
})
export class IntervinientesModule {}
