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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public carService: CartService,
    public clienteService: ClienteService) {
  
   this.pedido = this.navParams.get('pedido'); 
  }

  ionViewDidLoad() {
    this.cartItems = this.carService.getCart().itens;
    this.clienteService.findById(this.pedido.cliente.id)
       .subscribe(response => {
         this.cliente = response as ClienteDTO;
         this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos'])
         console.log(this.pedido)
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

   total(){
     return this.carService.total();
   }
}
