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

  getTodos(){
   return this.http.get('http://localhost:8000/calendario')
  }

  excluir(id: number){
    return this.http.delete(`http://localhost:8000/calendario/${id}`)
  }

  getId(id: number){
    return this.http.get(`http://localhost:8000/calendario/${id}`)
  }

  alterar(dados:any){
    return this.http.put(`http://localhost:8000/calendario/${dados.id}`, dados)
  }

  getDias(data: any){
    let url = `http://localhost:8000/calendario/gerarDias`
    return this.http.get(url, data)
  }
}
