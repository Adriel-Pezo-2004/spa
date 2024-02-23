import { Module } from '@nestjs/common';
import { TituloPropiedadService } from './issue.service';
import { TituloPropiedadController } from './issue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TituloPropiedad } from './entities/issue.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TituloPropiedad])],
  controllers: [TituloPropiedadController],
  providers: [TituloPropiedadService],
  exports:[TituloPropiedadService]
})
export class TituloPropiedadModule {}
