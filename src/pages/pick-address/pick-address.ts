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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage : StorageService,
    public clienteService : ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localStorage && localUser.email){
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.items = response['enderecos'];
      }, error => {
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
    }else{
        this.navCtrl.setRoot('HomePage');
    }

  }

}
