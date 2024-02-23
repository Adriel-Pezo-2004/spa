import { Test, TestingModule } from '@nestjs/testing';
import { TituloPropiedadController } from './titulo-propiedad.controller';
import { TituloPropiedadService } from './titulo-propiedad.service';

describe('TituloPropiedadController', () => {
  let controller: TituloPropiedadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TituloPropiedadController],
      providers: [TituloPropiedadService],
    }).compile();

    controller = module.get<TituloPropiedadController>(TituloPropiedadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
