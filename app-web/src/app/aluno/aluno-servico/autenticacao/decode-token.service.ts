import { Injectable } from '@angular/core';
import jwt from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class DecodeTokenService {

  public decodeTokenJWT(): string {
    try{
      let token = sessionStorage.getItem('token') || ''
      return jwt(token)
    }
    catch(error){
      return ''
    }    
  } 
}
