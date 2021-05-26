import { ClienteService } from './../../services/domain/cliente.service';
import { EstadoService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstadoDTO } from '../../Models/estado.dto';
import { CidadeDTO } from '../../Models/cidade.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades:CidadeDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {
      this.formGroup = this.formBuilder.group(
        {
            nome: ['',[Validators.required,
                       Validators.minLength(5),
                       Validators.maxLength(120)]],
            
            email:['',[Validators.required,
                   Validators.email]],

            tipo:['',[Validators.required]],

            cpfOucnpj: ['',[Validators.required,
              Validators.minLength(11),
              Validators.maxLength(14)]],

            senha:['',[Validators.required]],

            logradouro:['',[Validators.required]],

            numero:['',[Validators.required]],

            complemento:['',[]],

            bairro:['',[]],

            cep:['',[Validators.required]],

            telefone1:['',[Validators.required]],

            telefone2:['',[]],

            telefone3:['',[]],

            estadoId:[null,[Validators.required]],

            cidadeId:[null,[Validators.required]]
        });
  }

  ionViewDidLoad(){
  this.estadoService.findAll()
  .subscribe(response =>{
    this.estados = response;
    this.formGroup.controls.estadoId.setValue(this.estados[0].id);
    this.updateCidades(); 
  },
  error =>{});
    
  }

  updateCidades(){
    //pega o estado que está selecionado na lista do formgroup
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
    .subscribe(response =>{
       this.cidades = response;
       this.formGroup.controls.cidadeId.setValue(null);
    },
    error => {});
  }
  signupUser(){
    console.log(this.formGroup.value);
    this.clienteService.insert(this.formGroup.value)
    .subscribe(response =>{
      this.showInsertOk();
    },
    error =>{});
  }

  showInsertOk(){
let alert = this.alertCtrl.create({
  title: 'Sucesso!',
  message: 'Cadastro Efetuado com sucesso',
  enableBackdropDismiss: false,
  buttons:[{
    text: 'Ok',
    handler:() =>{
      this.navCtrl.setRoot('HomePage');
    }
  }]
});
   alert.present();
  }

}
