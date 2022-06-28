import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecodeTokenService } from 'src/app/aluno/aluno-servico/autenticacao/decode-token.service';
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
  msg: string = '';
  nota = { 'id': null, 'descricao': '', 'nota': null, 'iddisc': null };
  todasAsNotas: any;
  notaMedia: number = 0;
  iddisciplina: number = 0;
  alunoToken: any;

  constructor(private notaService: NotaService, private disciplinaService: CadastroService, private decodeToken: DecodeTokenService) {
    this.gerarTodos(this.iddisciplina);
  }

  ngOnInit(): void {
    this.alunoToken = this.decodeToken.decodeTokenJWT()
    this.selectDisciplina()
  }

  selectDisciplina(){
    this.disciplinaService.getTodos(this.alunoToken).subscribe(x => {
      this.listaDisciplinas = x
      if(this.listaDisciplinas == 0){
        this.msg = "*Não existem disciplinas cadastradas"
      }
      this.gerarAlgumaDisciplina(x)
      this.gerarTodos(this.iddisciplina);
    })
  }

  gerarAlgumaDisciplina(listaDisciplinas: any) {
    for (let obj of listaDisciplinas) {
      this.iddisciplina = obj.id
    }
  }

  gerarTodos(id: Number) {
    this.notaService.getTodos(id).subscribe(x => {
      this.todasAsNotas = x
      this.gerarMedia(x)
    })
  }

  gravar(nota: any) {
    this.notaService.salvarNota(nota).subscribe(() => {
      location.reload()
    })
  }

  excluir(id: any) {
    this.notaService.excluirNota(id).subscribe(() => {
      location.reload()
    })
  }

  gerarMedia(dados: any) {
    var media: number = 0
    if (dados.length > 0) {
      for (let calcMedia of dados) {
        media = Number(calcMedia.nota) + media
      }
      this.notaMedia = Number((media / dados.length).toFixed(2))
    } else {
      this.notaMedia = 0;
    }
  }

  gerarDisciplinas(dado: any) {
    this.iddisciplina = dado.disciplina
    this.notaService.getTodos(dado.disciplina).subscribe(x => {
      console.log(x)
      this.todasAsNotas = x
      this.gerarMedia(x)
    })
  }

}