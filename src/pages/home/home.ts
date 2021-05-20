import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  login(){
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
