import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule} from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule,HttpClientJsonpModule} from '@angular/common/http';//请求数据的模块
import {HttpServiceService} from '../app/shared/services/http-service.service';//引入请求数据的服务
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { QQSDK, QQShareOptions } from '@ionic-native/qqsdk/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,FormsModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,HttpClientJsonpModule],
  providers: [
    StatusBar,
    SplashScreen,
    HttpServiceService,
    InAppBrowser,
    QQSDK,
    Geolocation,
    QRScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
