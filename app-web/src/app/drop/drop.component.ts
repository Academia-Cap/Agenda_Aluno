import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { AlunoService } from '../aluno/aluno-servico/aluno.service';
import { DecodeTokenService } from '../aluno/aluno-servico/autenticacao/decode-token.service';


@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.css']
})
export class DropComponent implements OnInit {
  alunoToken: any;
  idAluno: any;
  imageHash: any;
  link: string ='';
  image: string='';

  constructor(private decodeToken: DecodeTokenService, private router: Router,private servicoAluno: AlunoService) { }

  ngOnInit(): void {
    this.alunoToken = this.decodeToken.decodeTokenJWT()
    this.idAluno = this.alunoToken.id  
    this.viewImagem()
  }

  Deslogar() {
    sessionStorage.removeItem('token')
    this.router.navigate(['/']);
  }

  viewImagem(){
    this.servicoAluno.viewAvatar(this.idAluno).subscribe(x =>{
      this.imageHash = x
      this.link = "https://i.imgur.com/"+this.imageHash.idavatar+".png"
      this.image = this.link
    })
  }

}
