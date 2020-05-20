import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {

  public tab = "tab1";
  public lesson={
    name:'',
    no:''
  };
  public activities=[
    {
    name:'app端原型设计',
    totalMember:'6',
    exp:'10',
    state:'已超时'
  },
  {
    name:'app端原型设计',
    totalMember:'6',
    exp:'10',
    state:'已超时'
  },
  {
    name:'app端原型设计',
    totalMember:'6',
    exp:'10',
    state:'已超时'
  }
]
  public isTeacher='';
  constructor(public activatedRoute:ActivatedRoute) { 
    this.lesson.name = localStorage.getItem("lesson_name");
    this.lesson.no = localStorage.getItem("lesson_no");
    this.isTeacher = localStorage.getItem("isTeacher");
    
  }
  
  ngOnInit() {
    // this.activatedRoute.queryParams.subscribe(params=> {
    //   this.lesson.name = params.lessonName;
    //   this.lesson.no = params.lessonNo;
    // })
  }

}
