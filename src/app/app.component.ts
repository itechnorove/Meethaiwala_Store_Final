import { Component } from '@angular/core';

import { Platform,NavController,Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { ServerService } from './service/server.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  appType:number = 0;
  dir:string = "ltr";
  text:any;
  public appPages:any = [];

  geoLatitude = null;
  geoLongitude=null;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private geolocation: Geolocation,
    public nav : NavController,
    private oneSignal: OneSignal,
    public events: Events,
    public server : ServerService
  ) {

     this.events.subscribe('lang_change', (type) => {
      
      this.assginAppType(type);

    });

    setInterval(() => {      
        
      if(localStorage.getItem('user_id') && localStorage.getItem('user') != "null" && localStorage.getItem('user') != undefined)
      {
        this.updateLocation();
      }

    },60000); 

    if(localStorage.getItem('app_text'))
    {
      this.text = JSON.parse(localStorage.getItem('app_text'));

      this.appPages = [
      {
        title: this.text.home,
        url: '/home',
        icon: 'home'
      },
      {
        title: this.text.language,
        url: '/lang',
        icon: 'flag'
      },
      {
        title: this.text.account,
        url: '/profile',
        icon: 'person'
      },
      {
        title: this.text.s_menu_title,
        url: '/item',
        icon: 'restaurant'
      },
      

  ];
      
    }
    else
    {
      var home:any      = "Home";
      var lang:any      = "Language";
      var profile:any   = "My Account";
      var menuItem:any   = "Menu Item";

      this.appPages = [
      {
        title: home,
        url: '/home',
        icon: 'home'
      },
      {
        title: lang,
        url: '/lang',
        icon: 'flag'
      },
      {
        title: profile,
        url: '/profile',
        icon: 'person'
      },
      {
        title: menuItem,
        url: '/item',
        icon: 'restaurant'
      },

  ];
    }

     this.events.subscribe('text', (text) => {
      
      this.text = text;

      this.appPages = [
      {
        title: text.home,
        url: '/home',
        icon: 'home'
      },
      {
        title: text.language,
        url: '/lang',
        icon: 'flag'
      },
      {
        title: text.account,
        url: '/profile',
        icon: 'person'
      },
      {
        title: text.s_menu_title,
        url: '/item',
        icon: 'restaurant'
      },

  ];

    });
    
    if(localStorage.getItem('app_type'))
    {
      if(localStorage.getItem('app_type') == "1")
      {
        this.dir = "rtl";
      }
      else
      {
         this.dir = "ltr";
      }
      
    }

    if(localStorage.getItem('user_id') && localStorage.getItem('user_id') != 'null')
    {
      this.nav.navigateRoot('/home');
    }
    else
    {
      this.nav.navigateRoot('/login');
    }


    this.initializeApp();

    this.events.subscribe('user_login', (id) => {

    this.subPush(id);

    });

  }

  assginAppType(ty)
  {
    this.dir = ty == 0 ? "ltr" : "rtl";
  }

  initializeApp() {

    this.platform.ready().then(() => {
      
      this.getGeolocation();

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#f44336');
      this.statusBar.styleLightContent();

      this.subPush();

    });


  }

  subPush(id = 0)
  {
      this.oneSignal.startInit('3d468c49-dc40-4c2f-8caa-6e9076ea9494', '656232489650');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

        this.oneSignal.handleNotificationReceived().subscribe(() => {
         // do something when notification is received
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {
          // do something when a notification is opened
        });

      if(localStorage.getItem('user_id') && localStorage.getItem('user_id') != 'null')
      {
          this.oneSignal.sendTags({user_id: localStorage.getItem('user_id')});
      }

      if(id > 0)
      {
          this.oneSignal.sendTags({user_id: id});
      }

      this.oneSignal.endInit();
  }

  getGeolocation(){
      
      this.geolocation.getCurrentPosition().then((resp) => {
        this.geoLatitude = resp.coords.latitude;
        this.geoLongitude = resp.coords.longitude; 
        //this.geoAccuracy = resp.coords.accuracy; 
        
       localStorage.setItem('current_lat',this.geoLatitude);
       localStorage.setItem('current_lng',this.geoLongitude);

       }).catch((error) => {
         


       });
    }

    updateLocation()
    {
      var allData = {lat : localStorage.getItem('current_lat'),lng : localStorage.getItem('current_lng'),user_id : localStorage.getItem('user_id')}

      this.server.upLocation(allData).subscribe((response:any) => {

        console.log(response);

      });
    }
}
