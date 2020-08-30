import { Component, OnInit,ViewChild } from '@angular/core';
import { ServerService } from '../service/server.service';
import { NavController,Platform,LoadingController,IonSlides,Events,AlertController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	
  data:any;
  text:any;
  store:any;
  complete:any;
  pet:number = 1;
  overview:any;

  constructor(public toastController: ToastController,public alertController: AlertController,public server : ServerService,private nav: NavController,public events: Events,public loadingController : LoadingController)
  {
    setInterval(() => {      
        
      this.loadData();

    },60000); 
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

    this.server.homepage(localStorage.getItem('user_id'),0).subscribe((response:any) => {
    this.data      = response.data;
    this.store     = response.store;
    this.text      = response.text;
    this.overview  = response.overview;
    this.complete  = response.complete;

    console.log(response);

    this.events.publish('text', this.text);

    localStorage.setItem('dboy', JSON.stringify(response.dboy));
    localStorage.setItem('app_text', JSON.stringify(response.text));
    localStorage.setItem('app_type', response.app_type);

    loading.dismiss();

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
