import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import Axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // public email: any = '';
  public register_email: string = '';
  public password1: string = '';
  public password2: string = '';
  public verify_code: string = '111';
  public return_code: string = '111';
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,
    disable: true
  }
  constructor(public httpService: HttpServiceService,
    public http: HttpClient,
    public router: Router,
    private alertController: AlertController,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  async onRegister(form: NgForm) {
    if (this.hasCode()) {
      if (form.valid) {
        //验证验证码是否正确
        // await this.onSendSMS();
        if (this.verify_code == this.return_code) {
          //两次密码输入是否一致
          if (this.password1 == this.password2) {
            var params = {
              email: this.register_email,
              password: this.password1
            }
            var api = '/register';//后台接口
            this.httpService.post(api, params).then(async (response: any) => {
              console.log(response.data);//返回参数
              if (response.data.respCode == 1) {//注册成功
                this.router.navigateByUrl('/lesson-tabs');
                localStorage.setItem("email", this.register_email);
                localStorage.setItem("isLogin", "1");
              }else{
                let toast = await this.toastController.create({
                  message: '注册失败！',
                  duration: 2000
                });
                toast.present();
              }
            })

          } else {
            let toast = await this.toastController.create({
              message: '两次密码不一致！',
              duration: 2000
            });
            toast.present();
          }
        } else {
          let toast = await this.toastController.create({
            message: '验证码不正确！',
            duration: 2000
          });
          toast.present();
        }
      }
    }
  }
  onSendSMS() {
    //点击按钮后请求后台数据 开始倒计时
    if (this.verifyCode.disable == true) {
      console.log("验证码");
      this.return_code = '11111'
      console.log(this.verify_code);
      var params = {//后台所需参数
        email: this.register_email,
      };
      console.log("发给后台参数" + params.email);
      //获取邮箱，将邮箱发给后台，请求后台返回验证码
      var api = '/sendCode';//后台接口
      this.httpService.post(api, params).then((response: any) => {
        this.return_code = response.data;//返回参数
      })
    }
    this.verifyCode.disable = false;
    this.settime();
  }

  hasCode() {
    if (this.verify_code != null && this.return_code != null) {
      return true;
    } else {
      return false;
    }
  }
  settime() {
    if (this.verifyCode.countdown == 1) {
      this.verifyCode.countdown = 60;
      this.verifyCode.verifyCodeTips = "获取验证码";
      this.verifyCode.disable = true;
      return;
    } else {
      this.verifyCode.countdown--;
    }
    this.verifyCode.verifyCodeTips = "重新获取(" + this.verifyCode.countdown + "秒)";
    setTimeout(() => {
      this.verifyCode.verifyCodeTips = "重新获取(" + this.verifyCode.countdown + "秒)";
      this.settime();
    }, 1000);
  }



}
