import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CepServicoService {

  constructor(private httpCliente: HttpClient) { }

  buscar(cep: String){
    return this.httpCliente.get(`https://viacep.com.br/ws/${cep}/json/`)
  }

  
}
