import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CadastroService } from 'src/app/disciplina/disciplina-services/cadastro.service';
import { ValidarService } from '../../disciplina/disciplina-services/validar.service';
import { NotaService } from '../notas-service/nota.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})

export class NotasComponent implements OnInit {
  listaDisciplinas: any;
  nota = { 'id': null, 'descricao': '', 'nota': null, 'iddisc': null };
  todasAsNotas: any;
  notaMedia: number = 0;
  listaNotas: any;
  iddisciplina = 7;

  constructor(private notaService: NotaService, private disciplinaService: CadastroService) {
    this.gerarTodos();
  }

  ngOnInit(): void {
    this.disciplinaService.getTodos().subscribe(x => this.listaDisciplinas = x)
    this.gerarTodos();
  }

  gerarTodos() {
    this.notaService.getTodos(this.iddisciplina).subscribe(x => this.todasAsNotas = x)
  }

  gravar(nota: any) {
    this.notaService.salvarNota(nota).subscribe(() => location.reload())
  }

  excluir(id: any) {
    this.notaService.excluirNota(id).subscribe(() => location.reload())
  }

  gerarMedia(dados: any) {
    console.log(dados)
    var media: number = 0
    for (let calcMedia of dados) {
      media = Number(calcMedia.nota) + media
    }
    this.notaMedia = media / dados.length
  }

  gerarDisciplinas(dado: any) {
    if (dado.disciplina != undefined && dado.disciplina != null) {
      this.iddisciplina = dado.disciplina
      this.notaService.getTodos(this.iddisciplina).subscribe(x => {
        this.todasAsNotas = x
        this.notaService.getTodos(this.iddisciplina).subscribe(x => this.gerarMedia(x))
      })
    } else {
      alert("Selecione uma Disciplina")
    }
  }

}