import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.page.html',
  styleUrls: ['./change-pass.page.scss'],
})
export class ChangePassPage implements OnInit {

  public changeinf = {
    email: '',
    oldpassword: '',
    password1: '',
    password2: ''
  }
  constructor(private toastController:ToastController,
    public httpService: HttpServiceService, 
    public http: HttpClient,
    public router: Router) { }

  ngOnInit() {
  }
  async onChangePass() {
    //两次新密码是否相同
    if (this.changeinf.password1 == this.changeinf.password2) {
      //请求后台发送四个参数
      //email
      this.changeinf.email = localStorage.getItem("email")
      var params = {//后台所需参数
        email: localStorage.getItem("email"),
        oldpassword: this.changeinf.oldpassword,
        //旧密码
        newpassword1:this.changeinf.password1,
        newpassword2:this.changeinf.password2
      };
      //将账号密码传给后台，得到返回值，若匹配无误，则进入班课列表界面
      var api = '/user/updatePassword';//后台接口
      this.httpService.post(api, params).then(async (response: any) => {
        console.log(response);
        if(response.data.respCode == 1){
          //修改密码成功，跳转到登录页
          this.router.navigateByUrl('');
        }
      })
      
    } else {
      let toast = await this.toastController.create({
        message: '两次新密码输入不一致！',
        duration: 2000
      });
      toast.present();
    }

  }

}
