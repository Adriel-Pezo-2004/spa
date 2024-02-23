import { Module } from '@nestjs/common';
import { TituloPropiedadService } from './titulo-propiedad.service';
import { TituloPropiedadController } from './titulo-propiedad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TituloPropiedad } from './entities/titulo-propiedad.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TituloPropiedad])],
  controllers: [TituloPropiedadController],
  providers: [TituloPropiedadService],
  exports:[TituloPropiedadService]
})
export class TituloPropiedadModule {}
