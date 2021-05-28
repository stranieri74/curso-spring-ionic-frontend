import { LocalUser } from './../Models/local_user';
import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from '../config/storege_keys.config';
import { Cart } from '../Models/cart';

@Injectable()
export class StorageService{

    getLocalUser(): LocalUser {
       let usr = localStorage.getItem(STORAGE_KEYS.localUser);

       if(usr == null){
           return null;
       }else{
           return JSON.parse(usr);
       }
    }

    setLocalUser(obj : LocalUser){
        if (obj == null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }else{
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }

    }

    //gravando informações para o carrinho
    getCart(): Cart {
        let usr = localStorage.getItem(STORAGE_KEYS.cart);
 
        if(usr == null){
            return null;
        }else{
            return JSON.parse(usr);
        }
     }
 
     setCart(obj : Cart){
         if (obj == null){
             localStorage.removeItem(STORAGE_KEYS.cart);
         }else{
             localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
         }
 
     }

}