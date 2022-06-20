import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(private http: HttpClient) { }

  gravar(dados: any){
    return this.http.post('http://localhost:8000/calendario', dados)
  }

  excluir(id: number){
    return this.http.delete(`http://localhost:8000/calendario/${id}`)
  }

  getTarefa(data: any){
    return this.http.post(`http://localhost:8000/calendario/periodo`, data)
  }

  alterar(dados:any){
    return this.http.put(`http://localhost:8000/calendario/${dados.id}`, dados)
  }

  getDias(data: any){
    let url = `http://localhost:8000/calendario/gerarDias`
    return this.http.post(url, data)
  }

  getId(id: number){
    return this.http.get(`http://localhost:8000/calendario/calendario/${id}`)
  }  
}
