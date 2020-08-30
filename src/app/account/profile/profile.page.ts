import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../../service/server.service';
import { ToastController,NavController,Platform,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
@ViewChild('content',{static:false}) private content: any;

data:any;
action:any;
text:any;
order:any;

  constructor(private route: ActivatedRoute,public server : ServerService,public toastController: ToastController,private nav: NavController,public loadingController: LoadingController){

    this.text = JSON.parse(localStorage.getItem('app_text'));
  
  }

  ngOnInit()
  {
  }

  ionViewWillEnter()
  {
    if(!localStorage.getItem('user_id') || localStorage.getItem('user_id') == 'null')
    {
      this.nav.navigateRoot('/login');

      this.presentToast("Please login for access your profile");
    }
    else
    {
      this.loadData();
    }
  }

  async takeAction(type)
  {    
    this.action = type;
  }

  async loadData()
  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.server.userInfo(localStorage.getItem('user_id')).subscribe((response:any) => {
  
    this.data  = response.data;
    this.order = response.order;

    loading.dismiss();

    });
  }

  async update(data)
  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    var allData = {id : localStorage.getItem('user_id'),password : data.password,min_cart_value : data.min_cart_value,delivery_charges_value:data.delivery_charges_value}

    this.server.updateInfo(allData).subscribe((response:any) => {

      this.action = 0;
      this.data = response.data;

      this.presentToast("Updated Successfully");

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

  logout()
  {
    localStorage.setItem('user_id',null);

    this.nav.navigateForward('/login');
  }

  storeOpen(type)
  {
    this.server.storeOpen(type+"?user_id="+localStorage.getItem('user_id')).subscribe((response:any) => {

      
    });
  }
}
