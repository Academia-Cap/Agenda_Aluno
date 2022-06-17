import { Component, OnInit } from '@angular/core';
import { DecodeTokenService } from 'src/app/aluno/autenticacao/decode-token.service';
import { InstituicaoService } from 'src/app/instituicao/instituicao-servico/instituicao.service';
import { CadastroService } from '../disciplina-services/cadastro.service';

@Component({
  selector: 'app-disciplina-cadastro',
  templateUrl: './disciplina-cadastro.component.html',
  styleUrls: ['./disciplina-cadastro.component.css']
})
export class DisciplinaCadastroComponent implements OnInit {

  msg: string = ""
  disciplina: any ={'nome':'', 'abreviacao':'', 'docente':'', 'anotacao':'', 'idinst':null};
  listaInstituicao: any ;
  alunoToken: any;
  toDisplay = false;

  constructor(private serviceCadastro: CadastroService, private instituicaoService: InstituicaoService,private decodeToken: DecodeTokenService ) { 
    
  }


  ngOnInit(): void {
    this.toDisplay = false;
    this.selectInstituicao();
    this.mostrarTodos();
    this.alunoToken = this.decodeToken.decodeTokenJWT()
  }


  mostrarTodos(){
    this.serviceCadastro.getTodos().subscribe(x => this.disciplina = x)
  }

  gravar(dados: any) {
    dados.idaluno = this.alunoToken.id
    if (this.disciplina.id == null) {
      this.serviceCadastro.gravar(dados).subscribe(x => this.disciplina = x)
    } else {
      dados.id = this.disciplina.id
      this.serviceCadastro.alterar(dados).subscribe(x => this.disciplina = x)
    }
  }

  editar(id: any) {
    this.toDisplay = true;
    this.serviceCadastro.getId(id).subscribe(x => this.disciplina = x)
  }

  excluir(id: any) {
    this.serviceCadastro.excluir(id).subscribe(x => window.location.reload())
  }

  selectInstituicao(){
    this.instituicaoService.getTodos().subscribe(x => this.listaInstituicao = x)
  }
  
}
