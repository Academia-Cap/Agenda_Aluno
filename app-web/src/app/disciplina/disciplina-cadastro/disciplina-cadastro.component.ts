import { Component, OnInit } from '@angular/core';
import { CadastroService } from './disciplina-services/cadastro.service';

@Component({
  selector: 'app-disciplina-cadastro',
  templateUrl: './disciplina-cadastro.component.html',
  styleUrls: ['./disciplina-cadastro.component.css']
})
export class DisciplinaCadastroComponent implements OnInit {

  disciplina: any;

  constructor(private serviceCadastro: CadastroService ) { 
    this.serviceCadastro.getAll().subscribe(x => this.disciplina = x)
  }

  gravar(dados: any){
    this.serviceCadastro.gravar(dados).subscribe(x => window.location.reload())
  }

  ngOnInit(): void {
  }

  // excluir(disciplina: any){
  //   this.serviceCadastro.excluir(disciplina).subscribe(x => window.location.reload())
  // }
}
