import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  public forgetinf = {
    email: '',
    password1: '',
    password2: ''
  }
  constructor(private toastController: ToastController,
    public httpService: HttpServiceService,
    public http: HttpClient,
    public alertController: AlertController,
    public router: Router) { }

  ngOnInit() {
  }
  async onForgetPass() {
    //两次新密码是否相同
    if(this.forgetinf.password1.length!=0){
      if (this.forgetinf.password1 == this.forgetinf.password2) {
        //email
        this.forgetinf.email = localStorage.getItem("email")
        var params = {//后台所需参数
          email: localStorage.getItem("email"),
          newpassword: this.forgetinf.password1,
        };
        //将账号密码传给后台，得到返回值，若匹配无误，则进入班课列表界面
        var api = '/user/forgetPassword';//后台接口
        this.httpService.post(api, params).then(async (response: any) => {
          console.log(response);
          if (response.data.respCode == 1) {
            let alert = await this.alertController.create({
              header: '提示',
              message: '设置新密码成功，点击确定返回登录页！',
              buttons: [{
                text: '确定',
                cssClass: 'secondary',
                handler: (blah) => {
                  //修改密码成功，跳转到登录页
                  this.router.navigateByUrl('');
                }
              }
  
            ]
            });
            alert.present();
          }
        })
      } else {
        let toast = await this.toastController.create({
          message: '两次密码输入不一致！',
          duration: 2000
        });
        toast.present();
      }
    }else{
      let toast = await this.toastController.create({
        message: '密码不能为空！',
        duration: 2000
      });
      toast.present();

    }
    

  }

}
