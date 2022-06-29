import { TestBed } from '@angular/core/testing';

import { InformacaoService } from './informacao.service';

describe('InformacaoService', () => {
  let service: InformacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
