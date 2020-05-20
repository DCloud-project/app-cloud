import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  // lesson-type='我创建的';
  lessonType: string = '我创建的';
  public content='';
  public lessonList = [
    {
      name: '工程实践',
      tname: '池老师',
      class: '计算机专硕1班',
      term:'2019-2020-2',
      no:'8542144'
    },
    {
      name: '工程实践',
      tname: '池老师',
      class: '计算机专硕1班',
      term:'2019-2020-2',
      no:'8542144'
    },
    {
      name: '工程实践',
      tname: '池老师',
      class: '计算机专硕1班',
      term:'2019-2020-2',
      no:'8542144'
    }
  ]

  constructor(public navParams:NavParams,public router:Router) {
    console.log(navParams.data.type);
    if(navParams.data.type == 'join'){
      this.lessonType="我加入的";
    }
   }
   dissmissSearch(){
    this.navParams.data.modal.dismiss();
  }
  getData($event){
    console.log($event.detail.value);
    //传给后台搜索的内容
    var params={
      content:$event.detail.value
    }
    //请求后台获取 我创建的班课列表
    /*
    var api = '/sendCode';//后台接口
   
    this.httpService.get(api, params).then((response: any) => {
      console.log(response);//返回参数
      this.resultList=返回的结果
    })
    */
  }

  ngOnInit() {}

}
