import { TestBed } from '@angular/core/testing';

import { CepServicoService } from './cep-servico.service';

describe('CepServicoService', () => {
  let service: CepServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CepServicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
