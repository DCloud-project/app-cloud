import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpServiceService } from '../../../shared/services/http-service.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {

  public email: any = '';
  public verify_code:string = '';
  public return_code:string = '1';
  randomnum = null;
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,
    disable: true
  }
  constructor(private router: Router, 
    public httpService: HttpServiceService,
    private activatedRoute: ActivatedRoute,
    private alertController:AlertController) { }

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
        localStorage.setItem("isLogin", "1");
        localStorage.setItem("email",this.email);
        this.getInf(this.email);
        // this.router.navigateByUrl('/lesson-tabs/mylesson');
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

  //获取个人信息
  getInf(email) {
    var params = {//后台所需参数
      email: email,
    };
    var api = '/user/info';//后台接口
    this.httpService.get(api, params).then(async (response: any) => {
      if (response.status == 200) {
        localStorage.setItem("role", response.data.role);
        if (localStorage.getItem("role") != null) {
          this.router.navigateByUrl('/lesson-tabs/mylesson');
        }

      }
    })
  }

  async onSendSMS() {
    //点击按钮后请求后台数据 开始倒计时
    if (this.verifyCode.disable == true) {
      var params = {//后台所需参数
        email: this.email,
      };
      //获取邮箱，将邮箱发给后台，请求后台返回验证码
      var api = '/sendCode';//后台接口
      this.httpService.post(api, params).then((response: any) => {
        console.log(response);//返回参数
        this.return_code = response.data.respCode;
      })
      
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
