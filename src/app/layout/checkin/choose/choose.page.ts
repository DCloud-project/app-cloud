import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { CheckinComponent } from '../../../shared/components/checkin/checkin.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.page.html',
  styleUrls: ['./choose.page.scss'],
})
export class ChoosePage implements OnInit {
  api = '/attendence';//后台接口
  public params = {};
  public record = []
  latitude: string;
  longitude: string;
  constructor(public modalController: ModalController,
    public router: Router,
    public loadingController: LoadingController,
    public httpService: HttpServiceService,
    private geolocation: Geolocation,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController) {
  }
  async checkExplain() {
    // console.log("签到方式说明");
    //弹出说明模态框
    const modal = await this.modalController.create({
      component: CheckinComponent,

    });
    await modal.present();

    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.flush == '1') {
        this.getCheckHistory();
      }
    });
  }
  async gotoClick() {
    //先请求是否有未结束班课，若有，则弹出框是否要停止
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    var params = {
      code: localStorage.getItem("lesson_no")
    }
    var api = '/attendence/isEnd'
    this.httpService.post(api, params).then(async (response: any) => {
      await loading.dismiss();
      if (response.data.respCode == '0') {//未结束
        const alert = await this.alertController.create({
          message: '有未结束签到，是否结束？',
          buttons: [
            {
              text: '取消',
            },
            {
              text: '确认',
              cssClass: 'secondary',
              handler: (blah) => {
                //结束当前班课
                var api = '/attendence/end'
                this.httpService.post(api, params).then(async (response: any) => {
                  if (response.data.respCode == '1') {
                    const alert = await this.alertController.create({
                      message: '成功结束签到，可发起新一轮签到！',
                      buttons: ['确认']
                    })
                    await alert.present();
                  }
                })
              }
            }
          ]
        });
        await alert.present();
      } else {
        this.getLocation();
      }
    })

    // this.getLocation();
    // this.startCheck();
    // this.router.navigateByUrl('click');
  }

  async getLocation() {
    const loading = await this.loadingController.create({
      message: '获取位置信息中..',
    });
    await loading.present();
    this.geolocation.getCurrentPosition().then(async (resp) => {
      this.latitude = JSON.stringify(resp.coords.latitude);
      this.longitude = JSON.stringify(resp.coords.longitude);
      await loading.dismiss();
      this.startCheck();
      // if(this.latitude.length > 0 || this.longitude.length > 0){
      //   // await loading.dismiss();
      //   this.startCheck();
      // }
      //获得系统参数
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  gotoGesture() {
    this.router.navigateByUrl('gesture');
  }

  gotoManual() {
    this.router.navigate(['/checkin-result'], {
      queryParams: {
        type: 1
      }
    })
    // this.router.navigateByUrl('checkin-result');
  }

  ngOnInit() {
    this.getCheckHistory();
  }
  // ionViewWillEnter() {
  //   this.getCheckHistory()
  // }
  ionViewDidEnter() {
    this.getCheckHistory()
  }
  async startCheck() {
    // this.getLocation();
    const loading = await this.loadingController.create({
      message: '发起签到中...',
    });
    await loading.present();
    this.params = {
      code: localStorage.getItem("lesson_no"),
      // local: "12,13"
      local: this.latitude + "," + this.longitude
    }
    this.httpService.post(this.api, this.params).then(async (response: any) => {
      await loading.dismiss();
      localStorage.setItem("attend_id", response.data);
      this.router.navigateByUrl('click');
    })
  }

  async getCheckHistory() {
    this.params = {
      code: localStorage.getItem("lesson_no")
    }
    this.httpService.patch(this.api, this.params).then(async (response: any) => {
      // console.log(response.data)
      this.record = response.data;
    })
  }
  getMyDay(date) {
    date = new Date(date)
    var week;
    if (date.getDay() == 0) week = "周日";
    if (date.getDay() == 1) week = "周一";
    if (date.getDay() == 2) week = "周二";
    if (date.getDay() == 3) week = "周三";
    if (date.getDay() == 4) week = "周四";
    if (date.getDay() == 5) week = "周五";
    if (date.getDay() == 6) week = "周六";
    return week;
  }
  checkHistoryDetail(item) {
    localStorage.setItem("attend_id", item.attend_id);
    this.router.navigateByUrl("checkin-result")
  }



}
