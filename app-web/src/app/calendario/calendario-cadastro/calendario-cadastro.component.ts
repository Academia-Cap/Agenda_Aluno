import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DecodeTokenService } from 'src/app/aluno/autenticacao/decode-token.service';
import { CadastroService } from 'src/app/disciplina/disciplina-services/cadastro.service';
import { CalendarioService } from '../calendario-servico/calendario.service';
import { ValidarService } from '../calendario-servico/validar.service';

@Component({
  selector: 'app-calendario-cadastro',
  templateUrl: './calendario-cadastro.component.html',
  styleUrls: ['./calendario-cadastro.component.css']
})
export class CalendarioCadastroComponent implements OnInit {
  model: NgbDateStruct | undefined;

  msg: string = "";
  tarefa: any = { 'id': null, 'titulo': '', 'periodo': null, 'horainicio': null, 'horafinal': null, 'descricao': '', 'iddisc': null, 'idaluno': null };
  todosDiasSemana: any;
  tarefaSegunda: any;
  tarefaTerca: any;
  tarefaQuarta: any;
  tarefaQuinta: any;
  tarefaSexta: any;
  tarefaSabado: any;
  tarefaDomingo: any;
  alunoToken: any;
  listaDisciplina: any;

  constructor(private serviceCalendario: CalendarioService,
    private decodeToken: DecodeTokenService, private disciplinaService: CadastroService,
    private serviceValidar: ValidarService) {
  }

  ngOnInit(): void {
    this.gerarDIas(new Date());
    this.selectDisciplina();
    this.alunoToken = this.decodeToken.decodeTokenJWT()
  }

  gravar(dados: any) {
    dados.idaluno = this.alunoToken.id
    dados.iddisc = this.serviceValidar.gerarIdDisciplina(dados)
    dados.periodo = this.serviceValidar.gerarData(dados)
    console.log(dados)

    if (this.tarefa.id == null) {
      this.serviceCalendario.gravar(dados).subscribe(x => this.tarefa = x)
    } else {
      dados.id = this.tarefa.id
      this.serviceCalendario.alterar(dados).subscribe(x => this.tarefa = x)
    }
  }

  gerarDIas(date: Date) {
    this.serviceCalendario.getDias(date).subscribe(x => {
      this.todosDiasSemana = x
      this.gerarTarefasDoDia(this.todosDiasSemana)
    })
  }

  selectDisciplina() {
    this.disciplinaService.getTodos().subscribe(x => this.listaDisciplina = x)
  }

  gerarTarefasDoDia(listaDias: any) {
    if (listaDias != undefined) {
      for (let i = 0; i < 7; i++) {
        let dia: String = listaDias[i]
        const data = { "periodo": listaDias[i] }
        switch (i) {
          case 0:
            this.serviceCalendario.getTarefa(data).subscribe(x => this.tarefaDomingo = x)
            break;
          case 1:
            this.serviceCalendario.getTarefa(data).subscribe(x => this.tarefaSegunda = x)
            break;
          case 2:
            this.serviceCalendario.getTarefa(data).subscribe(x => this.tarefaTerca = x)
            break;
          case 3:
            this.serviceCalendario.getTarefa(data).subscribe(x => this.tarefaQuarta = x)
            break;
          case 4:
            this.serviceCalendario.getTarefa(data).subscribe(x => this.tarefaQuinta = x)
            break;
          case 5:
            this.serviceCalendario.getTarefa(data).subscribe(x => this.tarefaSexta = x)
            break;
          case 6:
            this.serviceCalendario.getTarefa(data).subscribe(x => this.tarefaSabado = x)
            break;
        }
      }
    }
  }

  excluir(id: any) {
    this.serviceCalendario.excluir(id).subscribe(x => this.msg = "Tarefa excluida com sucesso")
  }

  editar(dados: any) {
    this.serviceCalendario.getId(dados).subscribe(x => {
      this.tarefa = x
      let aux: Date = new Date(this.tarefa.periodo)
      this.tarefa.periodo = { year: aux.getFullYear(), month: aux.getMonth(), day: aux.getDate() }
    })

  }

}
