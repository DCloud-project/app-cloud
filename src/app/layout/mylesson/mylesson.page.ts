import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { SearchComponent } from '../../shared/components/search/search.component';
import { HttpServiceService } from '../../shared/services/http-service.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

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

  public list = [];
  public index = 0;
  public lessonList = [{
    no: "",
    class: "",
    term: "",
    tname: "",
    name: ""
  }
  ];

  constructor(public httpService: HttpServiceService,
    public http: HttpClient,
    public modalController: ModalController,
    public router: Router,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController) {
    this.getCreateLesson();
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

  gotoCheckin(index) {
    localStorage.setItem("lesson_name", this.lessonList[index].name);
    localStorage.setItem("lesson_no", this.lessonList[index].no);
    this.router.navigateByUrl('/choose');
  }
  ngOnInit() {
    //请求后台获取 我创建的班课列表
    this.getCreateLesson();
  }
  //我创建的 user的教师id-->该教师对应的课程（登录时就应存该id）
  async getCreateLesson() {
    localStorage.setItem("isTeacher", '1');

    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.params = {
      teacher_email: localStorage.getItem("email")
    }
    this.httpService.get(this.api, this.params).then(async (response: any) => {
      await loading.dismiss();
      this.lessonList = response.data;
      if (this.lessonList.length > 5) {
        for (var i = 0; i < 5; i++) {
          this.list[i] = this.lessonList[i];
        }
        this.index = 5;
      } else {
        this.list = this.lessonList;
      }
    })
  }

  //我加入的 user的学生id，该学生对应的课程
  async getMyLesson() {
    localStorage.setItem("isTeacher", '0');

    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.params = {
      student_email: localStorage.getItem("email")
    }
    this.httpService.get(this.api, this.params).then(async (response: any) => {
      await loading.dismiss();
      this.lessonList = response.data;
      if (this.lessonList.length > 5) {
        for (var i = 0; i < 5; i++) {
          this.list[i] = this.lessonList[i];
        }
        this.index = 5;
      } else {
        this.list = this.lessonList;
      }

    })
  }

  // get() {
  //   console.log("tab" + this.tab);
  // }
  getCurrentLesson(index) {
    localStorage.setItem("lesson_name", this.lessonList[index].name);
    localStorage.setItem("lesson_no", this.lessonList[index].no);
    if (this.tab == 'tab1') {
      localStorage.setItem("isTeacher", '1');
    } else {
      localStorage.setItem("isTeacher", '0');
    }
    this.router.navigateByUrl("/tabs/member")
  }
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

  loadData(event) {

    setTimeout(() => {
      if (this.list.length == this.lessonList.length) {
        event.target.disabled = true;
        this.index = this.lessonList.length;
      }
      event.target.complete();
      if (this.lessonList.length - this.list.length > 5) {
        for (var i = this.index; i < this.index + 5; i++) {
          this.list.push(this.lessonList[i]);
        }
        this.index = this.index + 5;
      } else {
        for (var i = this.index; i < this.lessonList.length; i++) {
          this.list.push(this.lessonList[i]);
        }
      }
    }, 500);
  }

}
