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

    findByEmail(email: string) : Observable<ClienteDTO> {
       // let token = this.storage.getLocalUser().token;
        //let authHeader = new HttpHeaders({'Authorization': 'Bearer '+token});
        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImagemFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'})
    }
}