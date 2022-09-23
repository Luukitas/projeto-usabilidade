import { TestBed } from '@angular/core/testing';

import { PainelInicialService } from './painel-inicial.service';

describe('PainelInicialService', () => {
  let service: PainelInicialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PainelInicialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
