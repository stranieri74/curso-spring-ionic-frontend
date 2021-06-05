import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../services/domain/cliente.service';
import { ClienteDTO } from './../../Models/cliente.dto';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  cliente: ClienteDTO;
  picture : string;
  cameraOn : boolean = false;
  ;
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public ClienteService: ClienteService,
    public camera: Camera
    ) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localStorage && localUser.email){
      this.ClienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        //buscar imagem
        this.getImageIfExists();
      }, error => {
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
    }else{
        this.navCtrl.setRoot('HomePage');
    }
  }

  getImageIfExists(){
    this.ClienteService.getImagemFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`
    }, error =>{});
  }

  //acionar as cameras
  getCameraPicture(){
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((ImageData) => {
      this.picture = 'data:image/png;base64,'+ImageData;
      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });

  }

}
