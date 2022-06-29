import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(private http: HttpClient) { }

  gravar(dados: any){
    return this.http.post('https://agendaaluno.herokuapp.com/calendario', dados)
  }

  excluir(id: number){
    return this.http.delete(`https://agendaaluno.herokuapp.com/calendario/${id}`)
  }

  getTarefa(data: any){
    return this.http.post(`https://agendaaluno.herokuapp.com/calendario/periodo`, data)
  }

  alterar(dados:any){
    return this.http.put(`https://agendaaluno.herokuapp.com/calendario/${dados.id}`, dados)
  }

  getDias(data: any){
    let url = `https://agendaaluno.herokuapp.com/calendario/gerarDias`
    return this.http.post(url, data)
  }

  getId(id: number){
    return this.http.get(`https://agendaaluno.herokuapp.com/calendario/calendario/${id}`)
  }  
}
