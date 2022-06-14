import { Component, OnInit } from '@angular/core';
import { CadastroService } from './disciplina-services/cadastro.service';

@Component({
  selector: 'app-disciplina-cadastro',
  templateUrl: './disciplina-cadastro.component.html',
  styleUrls: ['./disciplina-cadastro.component.css']
})
export class DisciplinaCadastroComponent implements OnInit {

  msg: string = ""
  disciplina: any;

  constructor(private serviceCadastro: CadastroService ) { 
    this.serviceCadastro.getTodos().subscribe(x => this.disciplina = x)
  }

  gravar(dados: any){
    this.serviceCadastro.gravar(dados).subscribe(x => window.location.reload())
  }

  excluir(id: any) {
    this.serviceCadastro.excluir(id).subscribe(x => this.msg = "Disciplina excluida com sucesso")
  }

  ngOnInit(): void {
  }

  
}
