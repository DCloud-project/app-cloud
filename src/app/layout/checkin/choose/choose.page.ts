import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { CheckinComponent } from '../../../shared/components/checkin/checkin.component'
import { Router } from '@angular/router'

@Component({
  selector: 'app-choose',
  templateUrl: './choose.page.html',
  styleUrls: ['./choose.page.scss'],
})
export class ChoosePage implements OnInit {
  api = '/attendence';//后台接口
  public params = {};
  public record = []
  constructor(public modalController: ModalController,
    public router: Router,
    public loadingController: LoadingController,
    public httpService: HttpServiceService) {
  }
  ionViewWillEnter() {
    //这两个方法在将要进入界面的时候会触发,相当于是局部刷新,整个页面不会跟着刷新
    this.getCheckHistory();
  }
  async checkExplain() {
    console.log("签到方式说明");
    //弹出说明模态框
    const modal = await this.modalController.create({
      component: CheckinComponent,

    });
    await modal.present();
  }
  gotoClick() {
    this.startCheck();
    this.router.navigateByUrl('click');
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
  async startCheck() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.params = {
      code: localStorage.getItem("lesson_no"),
      local: "12,13"
    }
    this.httpService.post(this.api, this.params).then(async (response: any) => {
      await loading.dismiss();
      localStorage.setItem("attend_id", response.data);
    })
  }

  async getCheckHistory() {
    this.params = {
      code: localStorage.getItem("lesson_no")
    }
    this.httpService.patch(this.api, this.params).then(async (response: any) => {
      console.log(response.data)
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
