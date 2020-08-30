import { Component, OnInit,ViewChild } from '@angular/core';
import { ServerService } from '../service/server.service';
import { NavController,Platform,LoadingController,IonSlides,Events,AlertController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-item',
  templateUrl: 'item.page.html',
  styleUrls: ['item.page.scss'],
})
export class ItemPage {
	
  data:any;
  text:any;
  pet:number = 0;

  constructor(public toastController: ToastController,public alertController: AlertController,public server : ServerService,private nav: NavController,public events: Events,public loadingController : LoadingController)
  {
   
  }

  ionViewWillEnter()
  {
    if(localStorage.getItem('app_text') && localStorage.getItem('app_text') != undefined)
    {
      this.text = JSON.parse(localStorage.getItem('app_text'));
    }

    this.loadData();
  }

  ngOnInit()
  {
    
  }

  async loadData()
  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.server.getItem(localStorage.getItem('user_id')).subscribe((response:any) => {
   
    this.data      = response.data;
   
    loading.dismiss();

    });
  }

  changeStatus(id,status)
  {
    this.server.changeStatus(id,status).subscribe((response:any) => {


    });
  }

  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 3000,
      position : 'top',
      mode:'ios',
      color:'dark'
    });
    toast.present();
  }

  detail(odata)
  {
    localStorage.setItem('odata', JSON.stringify(odata));
    
    this.nav.navigateForward('/detail');
  }
}
