import { API_CONFIG } from './../../config/api.config';
import { StorageService } from './../storage.service';
import { ClienteDTO } from './../../Models/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class ClienteService{

    constructor(public http: HttpClient, public storage: StorageService){

    }

    findByEmail(email: string) {
       // let token = this.storage.getLocalUser().token;
        //let authHeader = new HttpHeaders({'Authorization': 'Bearer '+token});
        return this.http.get(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    findById(id: string) {
         return this.http.get(
             `${API_CONFIG.baseUrl}/clientes/${id}`);
     }

    getImagemFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'})
    }

    insert(obj : ClienteDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}