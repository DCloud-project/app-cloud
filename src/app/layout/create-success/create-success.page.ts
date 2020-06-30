import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-success',
  templateUrl: './create-success.page.html',
  styleUrls: ['./create-success.page.scss'],
})
export class CreateSuccessPage implements OnInit {
  // 生成二维码定义变量
  lessonCode = '';
  createdCode: string;  //要生成的二维码内容变量
  flag='0';
  public value='1';

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      // console.log(queryParams);
      if (queryParams.lessonNo) {
        this.lessonCode = queryParams.lessonNo;
        this.createdCode = queryParams.lessonNo;
      }else{
        this.lessonCode = localStorage.getItem("create-code");
        this.createdCode = localStorage.getItem("create-code");
      }
    });
    // this.createCode();
  }

  // createCode() {
  //   this.lessonCode = localStorage.getItem('create-code');
  //   this.createdCode = this.lessonCode;  
  // }

}
