import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidarService {

  constructor() { }

  gerarData(dados: any) {
    console.log(dados)
    return dados.periodo.year + '/' + dados.periodo.month + '/' + dados.periodo.day
  }

  gerarIdDisciplina(dados: any) {
    return dados.iddisc = Number(dados.iddisc)
  }

  verificarHorasValidas(dados: any) {
    if (dados.horainicio < dados.horafinal) {
      return true;
    } else{
      return false;
    }
  }

}
