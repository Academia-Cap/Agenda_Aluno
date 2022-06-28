import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DecodeTokenService } from 'src/app/aluno/aluno-servico/autenticacao/decode-token.service';
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

  msg: String = "";
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
  ultimaDiaSemana: any;
  primeiroDiaSemana: any;
  dataAtual = new Date();


  constructor(private serviceCalendario: CalendarioService,
    private decodeToken: DecodeTokenService, private disciplinaService: CadastroService,
    private serviceValidar: ValidarService) {
  }

  ngOnInit(): void {
    this.alunoToken = this.decodeToken.decodeTokenJWT()
    this.gerarDIas(this.dataAtual);
    this.selectDisciplina();
  }

  gravar(dados: any) {
    dados.idaluno = this.alunoToken.id
    dados.iddisc = this.serviceValidar.gerarIdDisciplina(dados)
    dados.periodo = this.serviceValidar.gerarData(dados)

    if (this.tarefa.id == null) {
      this.serviceCalendario.gravar(dados).subscribe(x => this.tarefa = x)
    } else {
      dados.id = this.tarefa.id
      this.serviceCalendario.alterar(dados).subscribe(x => this.tarefa = x)
    }
  }

  gerarDIas(date: Date) {
    var dados = {'data': date}
    this.serviceCalendario.getDias(dados).subscribe(x => {
      this.todosDiasSemana = x
      this.gerarTarefasDoDia(this.todosDiasSemana)
    })
  }

  selectDisciplina() {
    this.disciplinaService.getTodos(this.alunoToken).subscribe(x => {
      this.listaDisciplina = x
      if(this.listaDisciplina == 0){
        this.msg = "*Não existem disciplinas cadastradas"
      }
  })
  }

  gerarTarefasDoDia(listaDias: any) {
    if (listaDias != undefined) {
      console.log(listaDias)
      for (let i = 0; i < 7; i++) {
        const data = { "periodo": listaDias[i], "idaluno": this.alunoToken.id }
        switch (i) {
          case 0:
            this.serviceCalendario.getTarefa(data).subscribe(x => {
              this.tarefaDomingo = x
              this.primeiroDiaSemana = { "periodo": listaDias[i], "idaluno": this.alunoToken.id }
            })
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
            this.serviceCalendario.getTarefa(data).subscribe(x => {
              this.tarefaSabado = x
              this.ultimaDiaSemana = { "periodo": listaDias[i], "idaluno": this.alunoToken.id }
            })
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
      this.tarefa.periodo = { year: aux.getFullYear(), month: aux.getMonth() + 1, day: aux.getDate() }
    })
  }

  avancar() {
    var data = new Date(this.ultimaDiaSemana.periodo)
    var dia = data.getDate() + 1;
    var mes = data.getMonth();
    var ano = data.getFullYear();
    this.dataAtual = new Date(ano, mes, dia)
    this.gerarDIas(this.dataAtual)
    //window.location.reload()
  }

  voltar() {
    var data = new Date(this.primeiroDiaSemana.periodo)
    var dia = data.getDate() - 1;
    var mes = data.getMonth();
    var ano = data.getFullYear();
    this.dataAtual = new Date(ano, mes, dia)
    this.gerarDIas(this.dataAtual)
    //window.location.reload()
  }

}
