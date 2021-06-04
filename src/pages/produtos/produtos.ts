import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../Models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
   items : ProdutoDTO[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService : ProdutoService,
    public loadCtrl: LoadingController) {
  }

  ionViewDidLoad() {
     this.loadData();
  }

  loadData(){
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id)
       .subscribe(response => {
         //criando resposta personalisada, pegando apenas o que preciso
         this.items = response['content'];
         loader.dismiss();
         this.loadImageUrls();
       },
       error=> {
        loader.dismiss();
       });
  }

  loadImageUrls(){
    for (var i=0; i<this.items.length; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      },
      error =>{});
    }
  } 
  
  showDetail(produto_id : string){
    this.navCtrl.push('ProdutoDetailPage',
                       {produto_id : produto_id});
  }
//mostrando mensagem de carregando
  presentLoading(){
    let loader = this.loadCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(event) {
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 2000);
  }

}
