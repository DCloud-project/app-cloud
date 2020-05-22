import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchComponent } from '../../shared/components/search/search.component';
import { HttpServiceService } from '../../shared/services/http-service.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-mylesson',
  templateUrl: './mylesson.page.html',
  styleUrls: ['./mylesson.page.scss'],
})

export class MylessonPage implements OnInit {
  public tab = "tab1";
  public lessonName = '';
  public lessonNo = '';
  params = {}
  public result;
  api = '/courses';//后台接口

  public lessonList = [];

  constructor(public httpService: HttpServiceService,
    public http: HttpClient,
    public modalController: ModalController,
    public router: Router,
    public actionSheetController: ActionSheetController) {
    this.params = {
      teacher_id: 2
    }
  }
  async search(type) {
    //弹出搜索模态框
    const modal = await this.modalController.create({
      component: SearchComponent,
      componentProps: {
        type: type
      }
    });
    await modal.present();
  }

  gotoCheckin() {
    this.router.navigateByUrl('choose');
  }
  ngOnInit() {
    //请求后台获取 我创建的班课列表
    // this.httpService.get(this.api, this.params).then((response: any) => {
    //   this.lessonList = response.data;
    // })

    // this.httpService.getAll(api).then((response: any) => {
    //   console.log(response);//返回参数
    // })
    // this.httpService.post(api, this.params).then((response: any) => {
    //   console.log(response);//返回参数
    // })
    // this.httpService.patch(api, this.params).then((response: any) => {
    //   console.log(response);//返回参数
    // })
    // this.httpService.delete(api,this.params).then((response: any) => {
    //   console.log(response);//返回参数
    // })
    //   this.httpService.put(this.api,this.params).then((response: any) => {
    //   console.log(response);//返回参数
    // })
  }
  getCreatLesson() {
    // this.params = {
    //   teacher_id: 2
    // }
    // this.httpService.get(this.api, this.params).then((response: any) => {
    //   this.lessonList = response.data;
    // })
  }

  getMyLesson() {
    // this.params = {
    //   student_id: 1
    // }
    // this.httpService.get(this.api, this.params).then((response: any) => {
    //   this.lessonList = response.data;
    // })
  }

  get() {
    console.log("tab" + this.tab);
  }
  getCurrentLesson(index) {
    localStorage.setItem("lesson_name", this.lessonList[index].name);
    localStorage.setItem("lesson_no", this.lessonList[index].no);
    if (this.tab == 'tab1') {
      localStorage.setItem("isTeacher", '1');
    } else {
      localStorage.setItem("isTeacher", '0');
    }

  }

  // addLesson() {

  // }
  async addLesson() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: '创建班课',
          handler: () => {
            this.router.navigateByUrl('createlesson');
          }
        },
        {
          text: '使用班课号加入班课',
          handler: () => {
            this.router.navigateByUrl('join-by-code');
          }
        },
        {
          text: '使用二维码加入班课',
          handler: () => {
            this.router.navigateByUrl('join-by-qr');
          }
        },
        {
          text: '取消',
          role: 'destructive'
        }
      ]
    });

    await actionSheet.present();
  }
}
