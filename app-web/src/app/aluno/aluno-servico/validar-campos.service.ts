import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidarCamposService {
  constructor() { }

  validarNome(nome: any): String {
    const control = new FormControl(nome, [Validators.minLength(6), Validators.required]);
    return control.status;
  }

  validarEmail(email: any): String {
    const control = new FormControl(email, [Validators.email, Validators.required]);
    return control.status;
  }

  validarTelefone(telefone: any): string {
    if (telefone != "" && telefone.length == 15) {
      var telefoneSemMask = telefone.replace(/([^\w]*)/gi, '');
      return telefoneSemMask;
    }
    if(telefone.length == 11){
      var telefoneSemMask = telefone.replace(/([^\w]*)/gi, '');
      if( telefoneSemMask.length == 11){
        return telefone;
      }
    }
    return "INVALID";
  }

}
