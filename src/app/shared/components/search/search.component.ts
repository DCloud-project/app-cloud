import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { HttpServiceService } from '../../services/http-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  // lesson-type='我创建的';
  lessonType: string = '我创建的';
  public isTeacher = '1';
  public content = '';
  public lessonList = []

  constructor(public navParams: NavParams, public router: Router,
    public httpService: HttpServiceService,
    public http: HttpClient, ) {
    if (navParams.data.type == 'join') {
      this.isTeacher = '0';
      this.lessonType = "我加入的";
    }
  }
  dissmissSearch() {
    this.navParams.data.modal.dismiss();
  }
  getData($event) {
    //传给后台搜索的内容
    var api = '/courses';//后台接口
    var params = {}
    if (this.isTeacher == '1') {
      params = {
        search: $event.detail.value,
        teacher_email: localStorage.getItem("email")
      }
    } else {
      params = {
        search: $event.detail.value,
        student_email: localStorage.getItem("email")
      }
    }

    this.httpService.get(api, params).then((response: any) => {
      this.lessonList = response.data;
    })
  }

  ngOnInit() { }

}
