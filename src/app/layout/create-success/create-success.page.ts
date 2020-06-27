import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-success',
  templateUrl: './create-success.page.html',
  styleUrls: ['./create-success.page.scss'],
})
export class CreateSuccessPage implements OnInit {
  // 生成二维码定义变量
  lessonCode = '';
  userName: string;
  createdCode: string;  //要生成的二维码内容变量

  constructor() { }

  ngOnInit() {
    this.lessonCode = localStorage.getItem("create-code")
    this.createCode();
  }

  createCode() {
    this.lessonCode = localStorage.getItem('create-code');
    // this.userName = localStorage.getItem('userName');
    this.createdCode = this.lessonCode;  
  }

}
