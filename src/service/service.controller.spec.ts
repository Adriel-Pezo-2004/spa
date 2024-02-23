import { Test, TestingModule } from '@nestjs/testing';
import { AntecedentesController } from './antecedentes.controller';
import { ServicesService } from './service.service';

describe('AntecedentesController', () => {
  let controller: AntecedentesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AntecedentesController],
      providers: [ServicesService],
    }).compile();

    controller = module.get<AntecedentesController>(AntecedentesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
