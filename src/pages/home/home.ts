import { CredenciaisDTO } from './../../Models/credenciais.dto';
import { Component, ComponentFactoryResolver } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //cria esse objeto para pegar as informações dos formulários
  creds : CredenciaisDTO = {
     email: "",
     senha: ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  login(){
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage');

  }
  //entrar na pagina desabilita o menu tela home
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    }

    //entrar na pagina habilita o menu tela home
    ionViewDidLeave() {
    this.menu.swipeEnable(true);
    }


}
