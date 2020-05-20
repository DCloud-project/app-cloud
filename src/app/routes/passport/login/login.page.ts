import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../../shared/services/http-service.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { AlertController} from '@ionic/angular';


@Component({
  selector: 'common-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public tab = "tab1";
  public result = 'ok';
  login={
    email:'', 
    password: ''
  }
  constructor(public httpService: HttpServiceService, public http: HttpClient,public router:Router,public alertController:AlertController) {
  }

  async onLogin(form: NgForm) {
    if(form.valid){
      var params;
      if(this.tab == 'tab1'){//验证码登录
        //点击获取验证码后，进入获取验证码界面 
        this.router.navigateByUrl(`/verify/${this.login.email}`);
        localStorage.setItem("isLogin","true");
      }else{//密码登录
        params = {//后台所需参数
          email: this.login.email,
          password:this.login.password
        };
        console.log(params);

    //将账号密码传给后台，得到返回值，若匹配无误，则进入班课列表界面
        /*
      var api = '/sendCode';//后台接口
     
      this.httpService.post(api, params).then((response: any) => {
        console.log(response);//返回参数
        this.result=返回的结果
      })
      */
     if(this.result == "ok"){
      this.router.navigateByUrl('\lesson-tabs');

      let myDate = new Date();
        //获取当前年
        var year = myDate.getFullYear();
        //获取当前月
        var month = myDate.getMonth() + 1;
        //获取当前日
        var date = myDate.getDate();
        var h = myDate.getHours()<10 ? '0' + myDate.getHours() : '' + myDate.getHours(); //获取当前小时数(0-23)
        var m = myDate.getMinutes()<10 ? '0' + myDate.getMinutes() : '' + myDate.getMinutes(); //获取当前分钟数(0-59)
        var s = myDate.getSeconds()<10 ? '0' + myDate.getSeconds() : '' + myDate.getSeconds();
        localStorage.setItem("loginTime", year + "/" + month + "/" + date + " " + h + ":" + m + ":" + s);
     }else{
      let alert = await this.alertController.create({
        header: '提示',
        message: '用户名或者密码不正确',
        buttons: ['确定']
      });
      alert.present();
     }


    /*
    var params = ""
    this.httpService.get('http://localhost:3000/posts/1', params).then((response: any) => {
      console.log(response);
    })
    */
      }
      
    }

  }

  ngOnInit() {
  }

}
