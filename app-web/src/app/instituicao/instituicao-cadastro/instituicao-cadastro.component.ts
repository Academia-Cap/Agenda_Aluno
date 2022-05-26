import { Component, OnInit } from '@angular/core';
import { InstituicaoService } from 'src/app/instituicao-servico/instituicao.service';

@Component({
  selector: 'instituicao-cadastro',
  templateUrl: './instituicao-cadastro.component.html',
  styleUrls: ['./instituicao-cadastro.component.css']
})
export class InstituicaoCadastroComponent implements OnInit {

  msg: string = ""
  instituicao: any;

  constructor(private instituicaoService: InstituicaoService) {
    this.instituicaoService.getTodos().subscribe(x => this.instituicao = x)
  }

  gravar(dados: any) {
    this.instituicaoService.gravar(dados).subscribe(x => this.msg = "instituicao criado com sucesso")

  }

  excluir(id: any) {
    this.instituicaoService.excluir(id).subscribe(x => this.msg = "instituicao excluida com sucesso")
  }

  ngOnInit(): void {

  }

}
