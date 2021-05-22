import { StorageService } from './storage.service';
import { LocalUser } from './../Models/local_user';
import { CredenciaisDTO } from './../Models/credenciais.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthService{

    constructor(public http: HttpClient, public storage: StorageService){

    }

   authenticate(creds : CredenciaisDTO){
      return this.http.post(`${API_CONFIG.baseUrl}/login`, 
      creds,
      {
          observe: 'response', //pego o response
          responseType: 'text', // retorna o corpo vazio para não fazer parse de json
      });
   }

   successfulLogin(authorizationValue : string){
       let tok = authorizationValue.substring(7); // pega o tocken sem a palavra berer
       let user : LocalUser = {
           token: tok
       };
       this.storage.setLocalUser(user);
   }

   logout(){
       this.storage.setLocalUser(null);
   }

}