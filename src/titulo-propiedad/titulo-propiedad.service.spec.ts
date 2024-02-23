import { Test, TestingModule } from '@nestjs/testing';
import { TituloPropiedadService } from './titulo-propiedad.service';

describe('TituloPropiedadService', () => {
  let service: TituloPropiedadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TituloPropiedadService],
    }).compile();

    service = module.get<TituloPropiedadService>(TituloPropiedadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
