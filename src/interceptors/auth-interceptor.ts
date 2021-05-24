import { StorageService } from './../services/storage.service';
import { LocalUser } from './../Models/local_user';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Console } from "@angular/core/src/console";
import { Observable } from 'rxjs/Rx'; //IMPORTANTE: IMPORT ATUALIZADO
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   
    constructor(public storage: StorageService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let LocalUser = this.storage.getLocalUser();

        let N = API_CONFIG.baseUrl.length;
        let requestToApi = req.url.substring(0, N)== API_CONFIG.baseUrl;

        if(LocalUser && requestToApi){
        //preciso clocar a requisição original para pegar a autenticação
        const authReq = req.clone({headers: req.headers.set('Authorization','Bearer '+ LocalUser.token)});    
        return next.handle(authReq);    
    }else{
        return next.handle(req)
    }

    }     
}

// para instanciar e utilizar o interception
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true,
};

