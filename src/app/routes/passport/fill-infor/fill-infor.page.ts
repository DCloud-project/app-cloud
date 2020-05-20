import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-fill-infor',
  templateUrl: './fill-infor.page.html',
  styleUrls: ['./fill-infor.page.scss'],
})
export class FillInforPage implements OnInit {
  public userInfor={
    name:'',
    sno:'',
    password:'',
    identity:'0'//0--学生；1--老师
  }

  constructor(public router:Router) { }

  ngOnInit() {
  }
  onFill(form:NgForm){
    if(form.valid){
      //进入班课列表
      this.router.navigateByUrl('/lesson-tabs');
      var params={
        name:this.userInfor.name,
        sno:this.userInfor.sno,
        password:this.userInfor.password,
        identity:this.userInfor.identity
      }
    console.log(params);
      //将信息传给后台 后台写入数据库
       /*
      var api = '/sendCode';//后台接口
     
      this.httpService.post(api, params).then((response: any) => {
        console.log(response);//返回参数
        this.result=返回的结果
      })
      */
    }
  }

}
