import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DecodeTokenService } from 'src/app/aluno/autenticacao/decode-token.service';
import { CadastroService } from 'src/app/disciplina/disciplina-cadastro/disciplina-services/cadastro.service';
import { CalendarioService } from '../calendario-servico/calendario.service';

@Component({
  selector: 'app-calendario-cadastro',
  templateUrl: './calendario-cadastro.component.html',
  styleUrls: ['./calendario-cadastro.component.css']
})
export class CalendarioCadastroComponent implements OnInit {
  model: NgbDateStruct | undefined;

  msg: string = "";
  tarefa: any = { 'titulo': '', 'periodo': null, 'horainicio': null, 'horafinal': null, 'descricao': '', 'iddisc': null, 'idaluno': null };
  todosDiasSemana: any;
  tarefaSegunda: any;
  tarefaTerca: any;
  tarefaQuarta: any;
  tarefaQuinta: any;
  tarefaSexta: any;
  tarefaSabado: any;
  tarefaDomingo: any;
  alunoToken: any;
  disciplina : any;
  disc: any ={'id':null, 'nome':''};
  

  constructor(private calendarioService: CalendarioService, private decodeToken: DecodeTokenService, private disciplinaService: CadastroService) {  }

  ngOnInit(): void {
    this.gerarDIas(new Date());
    this.selectDisciplina();
  }

  gravar(dados: any) {
    this.alunoToken = this.decodeToken.decodeTokenJWT()
    dados.idaluno = this.alunoToken.id
    dados.iddisc = Number(dados.iddisc)
    console.log(dados.iddisc)
    dados.periodo = dados.periodo.year + '/' + dados.periodo.month + '/' + dados.periodo.day
    this.calendarioService.gravar(dados).subscribe(x => console.log("certo aqui" + x))
    console.log(dados)
  }

  gerarDIas(date: Date) {
    this.calendarioService.getDias(date).subscribe(x => console.log(x))
  }

  selectDisciplina(){
    this.disciplinaService.getTodos().subscribe(x => this.disciplina = x)
  }

  excluir(idtarefa: any){

  }
}
