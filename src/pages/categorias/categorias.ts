import { CategoriaService } from './../../services/domain/categoria.service';
import { CategoriaDTO } from './../../Models/categoria.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
     items: CategoriaDTO[];
     bucketUrl: string = API_CONFIG.bucketBaseUrl;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }



  ionViewDidLoad() {
    this.categoriaService.findAll()
    .subscribe(response =>{
      this.items = response;
    },
    error =>{
      //deixo em branco para deixar a responsabilidade para o interception e não para o contorlador
    });

  }
  showProdutos(categoria_id : string){
    this.navCtrl.push('ProdutosPage',{
      categoria_id : categoria_id //passagem de parametros
    });
  }

}
