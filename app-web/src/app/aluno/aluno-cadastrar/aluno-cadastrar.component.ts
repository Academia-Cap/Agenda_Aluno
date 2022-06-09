import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlunoService } from 'src/app/aluno-servico/aluno.service';
import { ValidarCamposService } from 'src/app/aluno-servico/validar-campos.service';

@Component({
  selector: 'app-aluno-cadastrar',
  templateUrl: './aluno-cadastrar.component.html',
  styleUrls: ['./aluno-cadastrar.component.css']
})
export class AlunoCadastrarComponent implements OnInit {

  constructor(private servicoAluno: AlunoService, private router: Router, private serviceValidar: ValidarCamposService) { }
  aluno: any;

  cadastrar(dados: any) {
    dados.telefone = this.serviceValidar.validarTelefone(dados.telefone)

    if (this.serviceValidar.validarNome(dados.nome) == "INVALID") {
      alert('Nome Inválido')
    }
    if (this.serviceValidar.validarEmail(dados.email) == "INVALID") {
      alert('Email Inválido')
    }
    console.log(dados.telefone)
    if (dados.telefone == "INVALID") {
      alert('Telefone Inválido')
    }

    if (dados.senha == "") {
      alert('Senha Inválido')
    }
    if (this.serviceValidar.validarNome(dados.nome) == "VALID" &&
      this.serviceValidar.validarEmail(dados.email) == "VALID" &&
      dados.telefone != "INVALID" && dados.senha != "") {
      this.Gravar(dados)
    }
  }

  Gravar(dados: any) {
    this.servicoAluno.gravar(dados).subscribe(x => this.aluno = x)
    this.router.navigate(['/perfilAluno', this.aluno.id]);
    alert('Cadastro criado com sucesso')
  }

  login(dados: any) {
    if (this.serviceValidar.validarEmail(dados.email) == "VALID" && dados.senha.length >= 6) {
      this.servicoAluno.login(dados).subscribe(x => this.aluno = x)
    } else{
      alert('Email e senha incorretos')
    }
  }

  ngOnInit(): void {
  }
}
