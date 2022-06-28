import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  baseApiUrl = "https://api.imgur.com/3/image/"


  constructor(private http: HttpClient) { }

  gravar(dados: any) {
    let url = `http://localhost:8000/aluno`
    return this.http.post(url, dados)
  }

  getAluno(idAluno: number) {
    let url = `http://localhost:8000/aluno/${idAluno}`
    return this.http.get(url)
  }

  alterarAluno(id: number, dados: any) {
    let url = `http://localhost:8000/aluno/${id}`
    return this.http.put(url, dados)
  }

  deletarAluno(idAluno: number) {
    let url = `http://localhost:8000/aluno/${idAluno}`
    return this.http.get(url)
  }

  alterarSenha(dados: any, idAluno: number) {
    let url = `http://localhost:8000/aluno/alterarSenha/${idAluno}`
    return this.http.put(url, dados)
  }


  //--------------------------------------------
  deleteImgur(dados: any) {
    console.log(dados)
    return this.http.post(dados, null, { headers: { "Authorization": ["Barer 57cb94391f26f835f9970935ef613749b0f7c646"] } })
  }

  deleteAvatar(idAluno: any, idAvatar: any){
    let url = `http://localhost:8000/aluno/addAvatar/${idAluno}`
    return this.http.put(url, idAvatar)
  }

  viewAvatar(idAluno: number) {
    let url = `http://localhost:8000/aluno/viewAvatar/${idAluno}`
    return this.http.get(url)
  }

  addAvatar(idAluno: any, dados: any) {
    let url = `http://localhost:8000/aluno/addAvatar/${idAluno}`
    return this.http.put(url, dados)
  }

  upload(file: any): Observable<any> {
    const formData = new FormData();
    formData.append("file",file)
    console.log(formData)
    return this.http.post(`https://api.imgur.com/3/image/`, formData, { headers: { "Authorization": ["Bearer 57cb94391f26f835f9970935ef613749b0f7c646"] } })
  }
}


