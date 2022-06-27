import { TestBed } from '@angular/core/testing';
import { ValidarCamposService } from './validar-campos.service';

fdescribe('ValidarCamposService', () => {
  let service: ValidarCamposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidarCamposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should function validarEmail to valid', () => {
    let emailTeste = "mariana@gmail.com"
    expect(service.validarEmail(emailTeste)).toEqual("VALID");
  });

  it('should function validarNome to valid', () => {
    var nomeTeste = "mariana";
    expect(service.validarNome(nomeTeste)).toEqual("VALID");
  });

  it('should function validaTelefone to valid', () => {
    var telefoneTeste = "(33)33333-3333";
    expect(service.validarNome(telefoneTeste)).toEqual("VALID");
  });

});
