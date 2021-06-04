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
   items : ProdutoDTO[] = [];
   page : number = 0;
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
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
       .subscribe(response => {
         //criando resposta personalisada, pegando apenas o que preciso
         //concatenando a resposta na lista
         let start = this.items.length;
         this.items = this.items.concat(response['content']);
         let end = this.items.length -1;
         //retornando para a lista sem concatenar
        // this.items = response['content'];
         loader.dismiss();
         console.log(this.page);
         console.log(this.items);
         this.loadImageUrls(start, end);
       },
       error=> {
        loader.dismiss();
       });
  }

  loadImageUrls(start: number, end : number){
    for (var i=start; i< end; i++){
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
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 2000);
  }

  loadInfinite(infiniteScroll){
    this.page ++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 2000)
  }
}
