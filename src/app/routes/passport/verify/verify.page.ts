import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {

  public email: any = '';
  public verify_code:string = '';
  public return_code:string = '123456';
  randomnum = null;
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,
    disable: true
  }
  constructor(private router: Router, private activatedRoute: ActivatedRoute,private alertController:AlertController) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.email = param.email;
    });
    this.onSendSMS();
  }
  async onVerify(form: NgForm) {
    if (form.valid) {
      //点击确认，与后台返回的验证码进行对比
      console.log("输入的验证码为" + this.verify_code);
      console.log("返回的验证码为" + this.return_code);
      if(this.verify_code == this.return_code){//相同
        localStorage.setItem("email",this.email);
        if(localStorage.getItem("isLogin") == "true"){
          this.router.navigateByUrl('/lesson-tabs');
        }else{
          this.router.navigateByUrl('/fill-infor');
        }
        
      }else{//不同，弹出提示框
        let alert = await this.alertController.create({
          header: '提示',
          message: '请输入正确的验证码!',
          buttons: ['确定']
        });
        alert.present();
      }
     
    }
  }

  async onSendSMS() {
    //点击按钮后请求后台数据 开始倒计时
    if (this.verifyCode.disable == true) {
      var params = {//后台所需参数
        email: this.email,
      };
      console.log("发给后台参数" + params.email);
      //获取邮箱，将邮箱发给后台，请求后台返回验证码
      /*
      var api = '/sendCode';//后台接口
      this.httpService.post(api, params).then((response: any) => {
        console.log(response);//返回参数
        this.return_code = 返回的验证码
      })
      */
    }
    this.verifyCode.disable = false;
    this.settime();
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
