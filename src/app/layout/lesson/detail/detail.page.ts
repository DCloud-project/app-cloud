import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public lesson={
    no:'88888888',
    name:'工程训练',
    checked:false,
    tname:'池老师',
    class:'计算机专硕1班',
    term:'2019-2020 1',
    type:'学校课表班课',
    school:'福州大学 数学与计算机科学学院',
    require:'未设置',
    process:'未设置',
    test:'未设置'

  };
  constructor() { 
    this.lesson.name = localStorage.getItem("lesson_name");
    this.lesson.no = localStorage.getItem("lesson_no");
  }

  ngOnInit() {
  }

}
