import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { DecodeTokenService } from '../aluno/aluno-servico/autenticacao/decode-token.service';


@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.css']
})
export class DropComponent implements OnInit {
  alunoToken: any;
  constructor(private decodeToken: DecodeTokenService, private router: Router) { }

  ngOnInit(): void {
    this.alunoToken = this.decodeToken.decodeTokenJWT()  
  }

  Deslogar() {
    sessionStorage.removeItem('token')
    this.router.navigate(['/']);
  }
  
}
