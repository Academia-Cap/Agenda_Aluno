import { Injectable } from '@angular/core';
import { CepServicoService } from '../instituicao-servico-cep/cep-servico.service';

@Injectable({
  providedIn: 'root'
})
export class ValidaCamposService {

  constructor(private cepService: CepServicoService) { }

  

  msgNome: string = "";
  vNome: string="";
  validaNome(event:any){
    this.vNome = event.target.value
    if(this.vNome.length < 3){
      this.msgNome = "Digite nome com 3 caracteres"
    }else{
      this.msgNome = ""
    }
  }
  
  msgSigla:string ="";
  vSigla: string="";
  validaSigla(event:any){
    this.vSigla = event.target.value
    if(this.vSigla.length < 3){
      this.msgSigla = "Digite sigla com 3 caracteres"
    }
    else{
      this.msgSigla=""
    }
  }
  
}
