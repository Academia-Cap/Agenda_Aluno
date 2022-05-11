
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DisciplinaCadastroComponent } from '../disciplina-cadastro.component';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) { }

  gravar(dados: any){
    let url = 'http://localhost:8081/disciplina'
    return this.http.post(url, dados)
  }

  getAll(){
    let url = 'http://localhost:8081/disciplina'
    return this.http.get(url)
  }
}
