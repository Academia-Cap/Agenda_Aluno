import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ValidarCamposService } from './validar-campos.service';

describe('ValidarCamposService', () => {
  let service: ValidarCamposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidarCamposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should function validarEmail to be true', () => {
    expect(service.validarEmail("mariana@gmail.com")).toBeTruthy();
  });

});
