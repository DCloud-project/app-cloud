import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { SearchComponent } from '../../../shared/components/search/search.component'
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SearchMemberComponent } from 'src/app/shared/components/search-member/search-member.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {
  public lesson = {
    no: '',
    name: ''
  };
  public isNo = '1';
  public member = [
    {
      name: '小丸子',
      sno: '190327991',
      sex: '1',
      exp: '15',
      index: '',
    }
  ]
  public isTeacher: any;
  public memberNo: any;
  public rank: any;
  public my_exp: any;
  constructor(public modalController: ModalController,
    private router: Router,
    public httpService: HttpServiceService,
    public http: HttpClient,
    private alertController: AlertController,
    private loadingController: LoadingController,
    public toastController: ToastController) {
  }
  ngOnInit() {
   this.getdata();
  }
  async getdata(){
    this.lesson.name = localStorage.getItem("lesson_name");
    this.lesson.no = localStorage.getItem("lesson_no");
    this.isTeacher = localStorage.getItem("isTeacher");
    // console.log(this.isTeacher);
    if (this.isTeacher == '1') {
      this.orderByNo();
      localStorage.setItem("isNo", "1");
    } else {
      this.orderByExp();
    }
    var params = {
      code: localStorage.getItem("lesson_no"),
      order: "0",//按经验值顺序显示
      email: localStorage.getItem("email")
    }
    var api = '/courses/member';//后台接口
    this.httpService.get(api, params).then(async (response: any) => {
      this.rank = response.data.rank;
      this.my_exp = response.data.exp;
    })
  }
  async orderByNo() {
    this.isNo = '0';
    localStorage.setItem("isNo", "1");
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    //按学号排序List
    var params = {
      code: localStorage.getItem("lesson_no"),
      order: "1"//按学号顺序显示
    }
    var api = '/courses/member';//后台接口
    this.httpService.get(api, params).then(async (response: any) => {
      await loading.dismiss();
      this.member = response.data;
      this.memberNo = this.member.length;
    })
  }
  async orderByExp() {
    this.isNo = '1';
    localStorage.setItem("isNo", "0");
    //按经验值排序list
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();//加载

    var params = {
      code: localStorage.getItem("lesson_no"),
      order: "0"//按经验值顺序显示
    }
    var api = '/courses/member';//后台接口
    this.httpService.get(api, params).then(async (response: any) => {
      await loading.dismiss();
      this.member = response.data;
      this.memberNo = this.member.length;
    })
  }
  async searchMember() {
    //弹出搜索模态框
    const modal = await this.modalController.create({
      component: SearchMemberComponent,
      componentProps: {
        type: '按照姓名、学号检索'
      }
    });
    await modal.present();
  }
  gotoCheck() {
    this.router.navigateByUrl('student-checkin');
  }

}
