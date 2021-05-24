import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Console } from "@angular/core/src/console";
import { Observable } from 'rxjs/Rx'; //IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
   
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error, caught) =>{

            let errorObj = error;
            if (errorObj.error){
                errorObj = errorObj.error;
            }

            //convertendo para Json
            if (!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }
            //mostrando msg
            return Observable.throw(errorObj);
        }) as any;
    }
}

// para instanciar e utilizar o interception
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi:true,
};

