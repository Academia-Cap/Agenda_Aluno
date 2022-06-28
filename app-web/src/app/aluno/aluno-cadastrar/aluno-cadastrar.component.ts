import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/aluno/aluno-servico/autenticacao/authentication.service';
import { DecodeTokenService } from 'src/app/aluno/aluno-servico/autenticacao/decode-token.service';
import { AlunoService } from '../aluno-servico/aluno.service';
import { InformacaoService } from '../aluno-servico/informacao.service';
import { ValidarCamposService } from '../aluno-servico/validar-campos.service';


@Component({
  selector: 'app-aluno-cadastrar',
  templateUrl: './aluno-cadastrar.component.html',
  styleUrls: ['./aluno-cadastrar.component.css']
})
export class AlunoCadastrarComponent implements OnInit {
  alunoToken: any;
  msg: string = '';
  msgNome: String = '';
  msgEmail: String = '';
  msgTel: string = '';
  msgSenha: String = '';
  msgLogin: string = '';

  constructor(private servicoAluno: AlunoService, private router: Router,
    private serviceValidar: ValidarCamposService, private auth: AuthenticationService,
    private decodeToken: DecodeTokenService, private displayInfo: InformacaoService) { }

  cadastrar(dados: any) {
    dados.telefone = this.serviceValidar.validarTelefone(dados.telefone)

    if (this.serviceValidar.validarNome(dados.nome) == "INVALID") {
      this.msgNome = "Nome Inválido"
    }
    if (this.serviceValidar.validarEmail(dados.email) == "INVALID") {
      this.msgEmail = "Email Inválido"
    }

    if (dados.telefone == "INVALID") {
      this.msgTel="Telefone Inválido"
    }

    if (dados.senha == "") {
      this.msgSenha="Senha Inválido"
    }
    if (this.serviceValidar.validarNome(dados.nome) == "VALID" &&
      this.serviceValidar.validarEmail(dados.email) == "VALID" &&
      dados.telefone != "INVALID" && dados.senha.length >= 6) {
      this.Gravar(dados)
    }
  }

  Gravar(dados: any) {
    this.servicoAluno.gravar(dados).subscribe(() => "Cadastrado")
    this.msg = "Cadastro criado com sucesso"
    this.displayInfo.setDisplayInfo("block")
  }

  login(dados: any) {
    if (this.serviceValidar.validarEmail(dados.email) == "VALID" && dados.senha.length >= 6) {
      this.auth.logar(dados.email, dados.senha).subscribe(
        token => {
          if (token != "Aluno não encontrado") {
            sessionStorage.setItem('token', JSON.stringify(token))
            this.alunoToken = this.decodeToken.decodeTokenJWT()
            this.router.navigate(['/perfilAluno', this.alunoToken.id])
          } else {
            this.msgLogin = "Login inválido"
          }
        }
      )
    } else {
      this.msgLogin = "Email e senha incorretos"
    }
  }

  ngOnInit(): void {
  }
}
