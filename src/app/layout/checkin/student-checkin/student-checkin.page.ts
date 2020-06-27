import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { ModalController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-student-checkin',
  templateUrl: './student-checkin.page.html',
  styleUrls: ['./student-checkin.page.scss'],
})
export class StudentCheckinPage implements OnInit {

  public checkHistory = [];
  public percent=0;
  constructor(public modalController: ModalController,
    public httpService: HttpServiceService,
    public http: HttpClient,
    private alertController: AlertController,
    private loadingController: LoadingController,
    public toastController: ToastController,
    private geolocation: Geolocation) { }

  ngOnInit() {
    this.getHistory();
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  async checkin() {

    var api = '/attendenceResult';//后台接口
    var params = {
      student_email: localStorage.getItem("email"),
      code: localStorage.getItem("lesson_no"),
      local: this.getLocation()
    }
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();//加载
    this.httpService.post(api, params).then(async (response: any) => {
      await loading.dismiss();
      if (response.data.respCode != "" && response.data.respCode != null) {
        this.presentToast(response.data.respCode)
      } else {
        this.presentToast("签到成功！" + response.data)
      }
    })
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      var latitude = resp.coords.latitude;
      var longitude = resp.coords.longitude;
      return latitude + "," + longitude;
      //获得系统参数
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  async getHistory() {
    var api = '/attendenceResult';//后台接口
    var params = {
      student_email: localStorage.getItem("email"),
      code: localStorage.getItem("lesson_no")
    }
    this.httpService.put(api, params).then(async (response: any) => {
      this.checkHistory = response.data;
      this.percent=this.checkHistory[this.checkHistory.length-1].per
      this.checkHistory.splice(this.checkHistory.length-1)
    })
  }
  getMyDay(date){
    date=new Date(date)
    var week;
    if(date.getDay()==0) week="周日";
    if(date.getDay()==1) week="周一";
    if(date.getDay()==2) week="周二";
    if(date.getDay()==3) week="周三";
    if(date.getDay()==4) week="周四";
    if(date.getDay()==5) week="周五";
    if(date.getDay()==6) week="周六";
    return week;
}


}
