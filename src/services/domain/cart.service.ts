import { ProdutoDTO } from './../../Models/produto.dto';
import { StorageService } from './../storage.service';
import { Injectable } from "@angular/core";
import { Cart } from '../../Models/cart';

@Injectable()
export class CartService{

    constructor(public storage: StorageService){

    }

    //limpar ou criar carrinho
    createOrClearCart() : Cart {
       let cart: Cart = {itens: []};

       this.storage.setCart(cart);
       return cart;
        }

    getCart() : Cart {
        let cart: Cart = this.storage.getCart();

        if(cart == null){
            cart = this.createOrClearCart();
        }

        return cart;
    }

    //adicionando produto no carrinho
    addProduto(produto: ProdutoDTO) : Cart {
       let cart = this.getCart();
       //procura se existe o produto na lista
       let position = cart.itens.findIndex(x => x.produto.id == produto.id); 
       if(position == -1){
           cart.itens.push({quantidade: 1, produto: produto});
       } 
       
       this.storage.setCart(cart);
       return cart;
    }
}