import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../aluno-servico/aluno.service';
import { ValidarCamposService } from '../aluno-servico/validar-campos.service';
import { DecodeTokenService } from '../aluno-servico/autenticacao/decode-token.service';
import { InformacaoService } from '../aluno-servico/informacao.service';
import { Token } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-aluno-perfil',
  templateUrl: './aluno-perfil.component.html',
  styleUrls: ['./aluno-perfil.component.css'],
})
export class AlunoPerfilComponent implements OnInit {
  name = 'Angular';
  msgNome: String = '';
  msg: String = '';
  msgTel: string = '';
  msgLogin: string = '';
  aluno: any = { 'nome': '', 'telefone': '', 'email': '', 'usuario': '', 'senha': null, 'idAvatar': '' };
  imagem: any = { 'title': '', 'description': '', 'image': '' }
  avatar: any = { 'image': '' }
  idavatar: any;
  idAluno: number = 0
  alunoToken: any;
  displayStyle: any;
  block = false;
  token: any = { "token": "" };
  image: string = '';
  imageHash: any;
  link: any;


  constructor(private servicoAluno: AlunoService, private router: Router, private http: HttpClient,
    private serviceValidar: ValidarCamposService, private decodeToken: DecodeTokenService, private displayInfo: InformacaoService) {
    this.alunoToken = this.decodeToken.decodeTokenJWT()
    this.idAluno = this.alunoToken.id
    this.servicoAluno.getAluno(this.idAluno).subscribe(x => this.aluno = x)
  }
  ngOnInit(): void {
    this.displayStyle = this.displayInfo.getDisplayInfo()
    this.viewImagem()
  }

  closeInfo() {
    if (this.displayInfo.getDisplayInfo() == "block") {
      this.displayInfo.setDisplayInfo("none")
      this.displayStyle = this.displayInfo.getDisplayInfo()
    }
  }

  editar(dados: any) {
    dados.telefone = this.serviceValidar.validarTelefone(dados.telefone)

    if (this.serviceValidar.validarNome(dados.nome) == "INVALID") {
      this.msgNome = '*Nome Inv??lido'
    }
    if (this.serviceValidar.validarNome(dados.usuario) == "INVALID") {
      this.msgLogin = '*Usu??rio Inv??lido'
    }
    if (dados.telefone == "INVALID") {
      this.msgTel = '*Telefone Inv??lido'
    }
    if (this.serviceValidar.validarNome(dados.nome) == "VALID" && dados.telefone != "INVALID"
      && this.serviceValidar.validarNome(dados.usuario)) {
      this.servicoAluno.alterarAluno(this.idAluno, dados).subscribe(x => {
        this.aluno = x
        window.location.reload();
      });
      this.msg = '*Alterado com sucesso'
    }
  }

  Deslogar() {
    sessionStorage.removeItem('token')
    this.router.navigate(['/']);
  }

  viewImagem() {
    this.servicoAluno.viewAvatar(this.idAluno).subscribe(x => {
      this.imageHash = x
      this.link = "https://i.imgur.com/" + this.imageHash.idavatar + ".png"
      this.image = this.link
    })

  }


}
