import { Component, OnInit } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';
import { DecodeTokenService } from 'src/app/aluno/aluno-servico/autenticacao/decode-token.service';
import { InstituicaoService } from 'src/app/instituicao/instituicao-servico/instituicao.service';
import { CepServicoService } from '../instituicao-servico/instituicao-servico-cep/cep-servico.service';
import { ValidaCamposService } from '../instituicao-servico/instituicao-servico-valida/valida-campos.service';



@Component({
  selector: 'instituicao-cadastro',
  templateUrl: './instituicao-cadastro.component.html',
  styleUrls: ['./instituicao-cadastro.component.css']
})
export class InstituicaoCadastroComponent implements OnInit {

  msg: string = ""
  alunoToken: any;
  instituicao: any = { 'nome': '', 'sigla': '', 'cep': '','idaluno':null };

  constructor(private instituicaoService: InstituicaoService, private cepService: CepServicoService, private camposService: ValidaCamposService,
    private decodeToken: DecodeTokenService) {

  }

  ngOnInit(): void {
    this.alunoToken = this.decodeToken.decodeTokenJWT()
    this.instituicaoService.getTodos(this.alunoToken).subscribe(x => this.instituicao = x)
  }

  gravar(dados: any) {
    dados.idaluno = this.alunoToken.id
    if (this.instituicao.id == null) {
      this.instituicaoService.gravar(dados).subscribe(x => this.instituicao = x)
    } else {
      dados.id = this.instituicao.id
      this.instituicaoService.alterar(dados).subscribe(x => this.instituicao = x)
    }
  }

  editar(id: any) {
    this.instituicaoService.getId(id).subscribe(x => this.instituicao = x)
  }

  excluir(id: any) {
    this.instituicaoService.excluir(id).subscribe(x => this.msg = "instituicao excluida com sucesso")
  }

  cep: string = "";
  endereco: any = {};
  msgCep: string = "";
  consultarCep(event: any) {
    this.cep = event.target.value;
    this.cep = this.cep.replace(/([^\w]*)/gi, '');

    if (this.cep.length == 8) {
      this.cepService.buscar(this.cep).subscribe((dados) => this.endereco = dados);
      this.msgCep = ""
    }
    else {
      this.msgCep = "Cep invalido"
    }

  }

  msgNome: string = "";
  vNome: string = "";
  validaNome(event: any) {
    this.vNome = event.target.value
    if (this.vNome.length < 3) {
      this.msgNome = "Digite nome com 3 caracteres"
    } else {
      this.msgNome = ""
    }
  }

  msgSigla: string = "";
  vSigla: string = "";
  validaSigla(event: any) {
    this.vSigla = event.target.value
    if (this.vSigla.length < 3) {
      this.msgSigla = "Digite sigla com 3 caracteres"
    }
    else {
      this.msgSigla = ""
    }
  }

}