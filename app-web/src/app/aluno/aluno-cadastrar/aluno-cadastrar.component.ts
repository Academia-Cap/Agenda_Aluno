import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/aluno/autenticacao/authentication.service';
import { DecodeTokenService } from 'src/app/aluno/autenticacao/decode-token.service';
import { AlunoService } from '../aluno-servico/aluno.service';
import { ValidarCamposService } from '../aluno-servico/validar-campos.service';


@Component({
  selector: 'app-aluno-cadastrar',
  templateUrl: './aluno-cadastrar.component.html',
  styleUrls: ['./aluno-cadastrar.component.css']
})
export class AlunoCadastrarComponent implements OnInit {
  aluno = { id: 0 };
  alunoToken: any;

  constructor(private servicoAluno: AlunoService, private router: Router,
    private serviceValidar: ValidarCamposService, private auth: AuthenticationService,
    private decodeToken: DecodeTokenService) { }

  cadastrar(dados: any) {
    dados.telefone = this.serviceValidar.validarTelefone(dados.telefone)

    if (this.serviceValidar.validarNome(dados.nome) == "INVALID") {
      alert('Nome Inválido')
    }
    if (this.serviceValidar.validarEmail(dados.email) == "INVALID") {
      alert('Email Inválido')
    }

    if (dados.telefone == "INVALID") {
      alert('Telefone Inválido')
    }

    if (dados.senha == "") {
      alert('Senha Inválido')
    }
    if (this.serviceValidar.validarNome(dados.nome) == "VALID" &&
      this.serviceValidar.validarEmail(dados.email) == "VALID" &&
      dados.telefone != "INVALID" && dados.senha.length >= 6) {
      this.Gravar(dados)
    }
  }

  Gravar(dados: any) {
    this.servicoAluno.gravar(dados).subscribe(() => "Cadastrado")
    alert('Cadastro criado com sucesso')
  }

  login(dados: any) {
    if (this.serviceValidar.validarEmail(dados.email) == "VALID" && dados.senha.length >= 6) {
      this.auth.logar(dados.email, dados.senha).subscribe(
        token => {
          if (token != "Aluno não encontrado") {
            localStorage.setItem('token', JSON.stringify(token))
            this.alunoToken = this.decodeToken.decodeTokenJWT()
            this.router.navigate(['/perfilAluno', this.alunoToken.id])
          } else {
            alert("Login inválido")
          }
        }
      )
    } else {
      alert('Email e senha incorretos')
    }
  }

  //verToken() {
  //  let usuario = this.decodeToken.decodeTokenJWT()
  //  console.log(usuario)
  //}

  ngOnInit(): void {
  }
}
