import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { LoadingController } from '@ionic/angular';
declare var BMap:any
@Component({
  selector: 'app-click',
  templateUrl: './click.page.html',
  styleUrls: ['./click.page.scss'],
})
export class ClickPage implements OnInit {
  params = {}
  public result;
  public address=[];
  public latitude=0;
  public longitude=0;
  api = '/attendence';//后台接口
  constructor(public httpService: HttpServiceService,
    public loadingController: LoadingController) {
      // this.startCheck()
      // this.params = {
      //   code: 8542144,
      //   local:"12,13"
      // }
  }

  ngOnInit() {
    this.startCheck()
    this.getAddr()
  }
  getLocation()
{
  console.log("sdhsjdh")
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(this.showPosition);
    }
    else{
      console.log("Geolocation is not supported by this browser.");
    }
}
showPosition(position)
{
    console.log("Latitude: " + position.coords.latitude +
        "<br />Longitude: " + position.coords.longitude);
}

  async startCheck(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.params = {
      code: localStorage.getItem("lesson_no"),
      local:"12,13"
    }
    this.httpService.post(this.api, this.params).then(async (response: any) => {
      await loading.dismiss();
      console.log(response.data);
     

    })
  }
  getAddr() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {//获取位置信息成功GPS坐标
          this.address.latitude = position.coords.latitude;
          this.address.longitude = position.coords.longitude;
          this.address.mPoint = new BMap.Point(this.address.longitude, this.address.latitude);
          console.log(this.address)
          this.changeCoord();

        },
        function(error) {  //获取位置信息失败
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
  changeCoord () {
    setTimeout(function(){
      BMap.Convertor.translate(this.address.mPoint,0,function (point) {//坐标转换完之后的回调函数
        this.address.mPoint = point;
        this.address.latitude = point.lat;
        this.address.longitude = point.lng;

      });
    }, 1000);
  };
  }