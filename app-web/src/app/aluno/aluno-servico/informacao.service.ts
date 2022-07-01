import { Injectable } from '@angular/core';
import { AlunoService } from './aluno.service';
import { DecodeTokenService } from './autenticacao/decode-token.service';

@Injectable({
  providedIn: 'root'
})
export class InformacaoService {
  private displayInfo: any;

  constructor() {  }

  getDisplayInfo() {
    return this.displayInfo;
  }

  setDisplayInfo(display: any) {
    this.displayInfo = display;
    
  }
}
