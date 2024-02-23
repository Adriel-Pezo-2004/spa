import { Test, TestingModule } from '@nestjs/testing';
import { AntecedentesController } from './antecedentes.controller';
import { AntecedentesService } from './antecedentes.service';

describe('AntecedentesController', () => {
  let controller: AntecedentesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AntecedentesController],
      providers: [AntecedentesService],
    }).compile();

    controller = module.get<AntecedentesController>(AntecedentesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
