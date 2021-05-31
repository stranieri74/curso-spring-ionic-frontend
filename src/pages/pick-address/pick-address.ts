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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [{
      id: "1",
      logradouro: "Rua Antonio zanoni",
      numero:"47",
      complemento:"apto 500",
      bairro: "Centro",
      cep: "14180000",
      cidade:{
        id:"1",
        nome:"uberlandia",
        estado:{
          id:"1",
          nome: "Minas Gerais"
        }
      }
    },
    {
      id: "2",
      logradouro: "Rua Antonio zanoni",
      numero:"50",
      complemento:"apto 511",
      bairro: "Centro",
      cep: "14180000",
      cidade:{
        id:"2",
        nome:"são Paulo",
        estado:{
          id:"2",
          nome: "São Paulo"
        }
      }
    }
  ];

  }

}
