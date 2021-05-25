import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group(
        {
            nome: ['',[Validators.required,
                       Validators.minLength(5),
                       Validators.maxLength(120)]],
            
            email:['',[Validators.required,
                   Validators.email]],

            tipo:['',[Validators.required]],

            cpfOuCnpj: ['',[Validators.required,
              Validators.minLength(11),
              Validators.maxLength(14)]],

            senha:['',[Validators.required]],

            lagradouro:['',[Validators.required]],

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

  signupUser(){
    console.log("Enviou o form")
  }

}
