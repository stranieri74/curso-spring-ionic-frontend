import { PedidoService } from './../../services/domain/pedido.service';
import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../Models/endereco.dto';
import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../Models/cart-item';
import { PedidoDTO } from './../../Models/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../Models/cliente.dto';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codPedido: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public carService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService) {
  
   this.pedido = this.navParams.get('pedido'); 
  }

  ionViewDidLoad() {
    this.cartItems = this.carService.getCart().itens;
    this.clienteService.findById(this.pedido.cliente.id)
       .subscribe(response => {
         this.cliente = response as ClienteDTO;
         this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos'])
         
       },
       error =>{
         //caso der algum erro ou token que expirou
          this.navCtrl.setRoot('HomePage');
       });
  }

private findEndereco(id: string, list: EnderecoDTO[]) : EnderecoDTO{
   let position = list.findIndex(x => x.id == id);
   return list[position];
}

   total() : number{
     return this.carService.total();
   }

   back(){
       this.navCtrl.setRoot('CartPage');  
   }

   home(){
    this.navCtrl.setRoot('CategoriasPage');  
}

   checkout(){
      this.pedidoService.insert(this.pedido)
      .subscribe(response => {
         //pegando a resposta do location
         //pegando o id do produto gerado
         this.codPedido = this.extractId(response.headers.get('location')); 
         this.carService.createOrClearCart();    
      },
      error => {
        if(error.status ==403){
           this.navCtrl.setRoot('HomePage');
        }
      })
   }

   //função auxiliar
   private extractId(location : string) :string {
     let position = location.lastIndexOf('/');
     return location.substring(position+1, location.length);
   }

}
