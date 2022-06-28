import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { InstituicaoService } from './instituicao.service';

fdescribe('InstituicaoService', () => {

  let service: InstituicaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(InstituicaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
