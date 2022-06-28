import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../aluno-servico/aluno.service';
import { ValidarCamposService } from '../aluno-servico/validar-campos.service';
import { DecodeTokenService } from '../aluno-servico/autenticacao/decode-token.service';
import { InformacaoService } from '../aluno-servico/informacao.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-aluno-perfil',
  templateUrl: './aluno-perfil.component.html',
  styleUrls: ['./aluno-perfil.component.css'],
})
export class AlunoPerfilComponent implements OnInit {
  msgNome: String = '';
  msg: String = '';
  msgTel: string = '';
  msgLogin: string = '';
  aluno: any = {};
  imagem: any = {'title':'', 'description':'', 'image': ''}
  avatar: any = {'image':''}
  idavatar: any;
  idAluno: number = 0
  alunoToken: any;
  displayStyle: any;
  block = false;

  url:any;

  image: string = '';

  imageHash:any;
  link:any;

  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File | undefined; // Variable to store file

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
    if(this.displayInfo.getDisplayInfo() == "block"){
      this.displayInfo.setDisplayInfo("none")
      this.displayStyle = this.displayInfo.getDisplayInfo()
    }
  }

  editar(dados: any) {
    dados.telefone = this.serviceValidar.validarTelefone(dados.telefone)

    if (this.serviceValidar.validarNome(dados.nome) == "INVALID") {
      this.msgNome = '*Nome Inválido'
    }
    if (this.serviceValidar.validarNome(dados.usuario) == "INVALID") {
      this.msgLogin = '*Usuário Inválido'
    }
    if (dados.telefone == "INVALID") {
      this.msgTel = '*Telefone Inválido'
    }
    if (this.serviceValidar.validarNome(dados.nome) == "VALID" && dados.telefone != "INVALID" 
      && this.serviceValidar.validarNome(dados.usuario)) {
      this.servicoAluno.alterarAluno(this.idAluno, dados).subscribe(x => this.aluno = x);
      window.location.reload();
      this.msg = '*Alterado com sucesso'
    }
  }

  Deslogar() {
    sessionStorage.removeItem('token')
    this.router.navigate(['/']);
  }

  addImagem(){
    /*console.log(event);

    const selectedFiles = event.srcElement.files;
    
    this.imagem.title = this.aluno.nome
    this.imagem.description = "Foto de "+this.aluno.nome
    this.imagem.image = 

    this.servicoAluno.uploadImgur(this.imagem).subscribe(x =>{ 
      this.imagem = x
      console.log(this.imagem)
      this.idavatar = this.imagem.id
      this.servicoAluno.addAvatar(this.idavatar,this.idAluno)
    })*/
    //this.servicoAluno.uploadImgur().subscribe(x=> console.log(x))
  }
  
onChange(event: any) {
    this.file = event.target.files[0];
}

onUpload() {
  this.servicoAluno.upload(this.file).subscribe(x => console.log(x));
}

  viewImagem(){
    this.servicoAluno.viewAvatar(this.idAluno).subscribe(x =>{
      this.imageHash = x
      this.link = "https://i.imgur.com/"+this.imageHash.idavatar+".png"
      this.image = this.link
    })

  }

  excluirImagem(){
    this.servicoAluno.viewAvatar(this.idAluno).subscribe(x =>{
      this.imageHash = x
      this.link = "https://api.imgur.com/3/image/"+this.imageHash.idavatar
      this.servicoAluno.deleteImgur(this.link)
      this.idavatar =  "qsHobpa"
      this.servicoAluno.deleteAvatar(this.idAluno, this.idavatar).subscribe(x => this.imagem = x)
    })
  }
}
