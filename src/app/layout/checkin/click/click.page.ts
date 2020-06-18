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
    this.funcTest()
    // this.getAddr()

    // this.funcTest()
    // this.getLocation()
  }
  getLocation() {
    console.log("sdhsjdh")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
    else {

      console.log("Geolocation is not supported by this browser.");
    }
  }
  showPosition(position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log("Latitude: " + position.coords.latitude +
      "<br />Longitude: " + position.coords.longitude);
  }


  getAddr() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {//获取位置信息成功GPS坐标
          this.address.latitude = position.coords.latitude;
          this.address.longitude = position.coords.longitude;
          this.address.mPoint = new BMap.Point(this.address.longitude, this.address.latitude);
          console.log(this.address)
          this.changeCoord();

        },
        function (error) {  //获取位置信息失败
          console.log("定位失败")
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.log('请打开设备定位功能！');
              break;
            case error.POSITION_UNAVAILABLE:
              console.log('定位信息不可用！');
              break;
            case error.TIMEOUT:
              console.log('定位请求超时！');
              break;

          }
        },
        {
          // 指示浏览器获取高精度的位置，默认为false
          enableHighAccuracy: true,
          // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
          timeout: 5000,
          // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
          maximumAge: 3000
        });
    } else {
      console.log('您的设备不支持GPS定位！');
    }
  };
  changeCoord() {
    setTimeout(function () {
      BMap.Convertor.translate(this.address.mPoint, 0, function (point) {//坐标转换完之后的回调函数
        this.address.mPoint = point;
        this.address.latitude = point.lat;
        this.address.longitude = point.lng;

      });
    }, 1000);
  };
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
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            var params = {
              attend_id: localStorage.getItem("attend_id"),
              type: 0
            }
            this.httpService.delete(this.api, params).then(async (response: any) => {
              console.log(response.data)
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
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            var params = {
              attend_id: localStorage.getItem("attend_id"),
              type: 1
            }
            this.httpService.delete(this.api, params).then(async (response: any) => {
              console.log(response.data)
              clearInterval(this.interval)
              this.router.navigateByUrl('checkin-result');
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
      console.log(response.data.count)
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