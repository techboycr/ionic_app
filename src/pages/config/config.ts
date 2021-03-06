import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';

import { ComunicacionProvider } from '../../providers/comunicacion/comunicacion';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {
  constructor(
    private navCtrl: NavController,
    private comunicacion:ComunicacionProvider,
    private loadingCtrl: LoadingController
  ) {

  }

  private buscar():void{
    let animacion = this.loadingCtrl.create({
      content: 'Buscando'
    });

    animacion.present();

    if(!this.comunicacion.isEnable){
      this.comunicacion.enable().then(()=>{
        this.comunicacion.find().then(()=>{
          animacion.dismiss();
        }).catch(()=>{
          animacion.dismiss();
        });
      }).catch(()=>{
        animacion.dismiss();
      });;
    }else{
      this.comunicacion.find().then(()=>{
        animacion.dismiss();
      }).catch(()=>{
        animacion.dismiss();
      });
    }

  }

  private regresar():void{
    this.navCtrl.pop();
  }

  private conectar(dispositivo:any){
    let animacion = this.loadingCtrl.create({
      content: 'Conectando'
    });
    animacion.present();
    this.comunicacion.connect(dispositivo).then(()=>{
      this.navCtrl.pop();
      animacion.dismiss();
    }).catch(()=>{
      animacion.dismiss();
    });
  }

  private desconectar():void{
    this.comunicacion.disconnect();
  }
}
