import { Test, TestingModule } from '@nestjs/testing';
import { IntervinientesService } from './intervinientes.service';

describe('IntervinientesService', () => {
  let service: IntervinientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntervinientesService],
    }).compile();

    service = module.get<IntervinientesService>(IntervinientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
