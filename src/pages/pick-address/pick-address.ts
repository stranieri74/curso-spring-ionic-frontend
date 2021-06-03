import { CartService } from './../../services/domain/cart.service';
import { PedidoDTO } from './../../Models/pedido.dto';
import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { EnderecoDTO } from './../../Models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage : StorageService,
    public clienteService : ClienteService,
    public cartService : CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localStorage && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.items = response['enderecos'];

        //para pegar a lista de pedido de compras
        let cart = this.cartService.getCart(); 
        this.pedido = {
          //peguei o id do cliente
          cliente: {id: response['id']},
          enderecoDeEntrega: null,
          pagamento: null,
          //fez um lambida para percorrer a lista
          //map é um loop para percorrer a lista e posso
          //transforma o objeto no que preciso
          itens : cart.itens.map(x =>{
            return{quantidade: x.quantidade, 
                   produto: {id: x.produto.id}}
          })
        }
      }, error => {
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
    }else{
        this.navCtrl.setRoot('HomePage');
    }
  }

   nextPage(item: EnderecoDTO){
     this.pedido.enderecoDeEntrega = {id: item.id};
     console.log(this.pedido);
   }

}
