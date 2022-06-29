import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(private http: HttpClient) { }

  gravar(dados: any){
    return this.http.post('https://agendaaluno.herokuapp.com', dados)
  }

  excluir(id: number){
    return this.http.delete(`https://agendaaluno.herokuapp.com/${id}`)
  }

  getTarefa(data: any){
    return this.http.post(`https://agendaaluno.herokuapp.com/periodo`, data)
  }

  alterar(dados:any){
    return this.http.put(`https://agendaaluno.herokuapp.com/${dados.id}`, dados)
  }

  getDias(data: any){
    let url = `https://agendaaluno.herokuapp.com/gerarDias`
    return this.http.post(url, data)
  }

  getId(id: number){
    return this.http.get(`https://agendaaluno.herokuapp.com/calendario/${id}`)
  }  
}
