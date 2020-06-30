import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { LoadingController, AlertController } from '@ionic/angular';

declare var BMap: any
@Component({
  selector: 'app-click',
  templateUrl: './click.page.html',
  styleUrls: ['./click.page.scss'],
})
export class ClickPage implements OnInit {
  params = {}
  public result;
  public address = [];
  public latitude: any;
  public longitude: any;
  api = '/attendence';//后台接口
  public attnId: any;
  public checkinNum = 0;
  public totalNum = 0;
  public interval: any;
  constructor(public httpService: HttpServiceService,
    public loadingController: LoadingController,
    public router: Router,
    public alertController: AlertController) {
    // this.startCheck()
    // this.params = {
    //   code: 8542144,
    //   local:"12,13"
    // }
  }

  ngOnInit() {
    this.getCheckResult();
    this.funcTest();
  }
  ionViewWillEnter() {
    //这两个方法在将要进入界面的时候会触发,相当于是局部刷新,整个页面不会跟着刷新
    this.getCheckResult();
    this.funcTest();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '取消签到!',
      message: '确定要取消签到吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            var params = {
              attend_id: localStorage.getItem("attend_id"),
              type: 0
            }
            this.httpService.delete(this.api, params).then(async (response: any) => {
              // console.log(response.data)
              clearInterval(this.interval)
              this.router.navigateByUrl('choose')
            })

          }
        }
      ]
    });
    await alert.present();
  }
  giveup() {
    this.presentAlertConfirm()
  }
  async endCheckin() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '结束签到!',
      message: '确定要结束签到吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            var params = {
              attend_id: localStorage.getItem("attend_id"),
              type: 1
            }
            this.httpService.delete(this.api, params).then(async (response: any) => {
              // console.log(response.data)
              clearInterval(this.interval)
              this.router.navigateByUrl('checkin-result', { replaceUrl: true });
            })

          }
        }
      ]
    });
    await alert.present();
  }
  getCheckResult = function () {
    var params = {
      attend_id: localStorage.getItem("attend_id"),
      code: localStorage.getItem("lesson_no")
    }
    this.httpService.put(this.api, params).then(async (response: any) => {
      // console.log(response.data.count)
      this.checkinNum = response.data.count;
      this.totalNum = response.data.total;
    })
  }
  funcTest() {
    //每隔3秒执行一次
    this.interval = setInterval(() => {
      this.getCheckResult();
    }, 3000);

  }
}