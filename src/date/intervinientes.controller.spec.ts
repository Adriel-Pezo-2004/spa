import { Test, TestingModule } from '@nestjs/testing';
import { IntervinientesController } from './intervinientes.controller';
import { IntervinientesService } from './intervinientes.service';

describe('IntervinientesController', () => {
  let controller: IntervinientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntervinientesController],
      providers: [IntervinientesService],
    }).compile();

    controller = module.get<IntervinientesController>(IntervinientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
