import { AuthService } from './../../services/auth.service';
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

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {

  }

  login(){
    this.auth.authenticate(this.creds)
    .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error =>{})

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
