import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../services/domain/cliente.service';
import { ClienteDTO } from './../../Models/cliente.dto';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  cliente: ClienteDTO;
  picture : string;
  cameraOn : boolean = false;
  profileImage;
  ;
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public ClienteService: ClienteService,
    public camera: Camera,
    public sanitizer: DomSanitizer
    ) {
      this.profileImage = 'assets/imgs/avatar-blank.png';
  }

  ionViewDidLoad() {
     this.loadDate(); 
  }

  loadDate(){
    let localUser = this.storage.getLocalUser();
    if (localStorage && localUser.email){
      this.ClienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        //buscar imagem
        console.log('deu certo procura img')
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
      this.blobToDataUrl(response).then(dataUrl =>{
        let str: string = dataUrl as string
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
      }) 
    }, error =>{
      this.profileImage = 'assets/imgs/avatar-blank.png';
    });
  }

  //função para converter imagem para string
  blobToDataUrl(blob){
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fulfill(reader.result);
      reader.readAsDataURL(blob);
    })
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

  getGalleryPicture(){
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
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

  sendPicture(){
    console.log("123");
   this.ClienteService.uploadPicture(this.picture)
      .subscribe(response => {
        console.log('enviado');
         this.picture = null;
         this.getImageIfExists();
      },
      error =>{});
  }

  cancel(){
    this.picture = null;
  }

}
