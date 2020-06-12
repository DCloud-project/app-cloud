import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lesson-detail-edit',
  templateUrl: './lesson-detail-edit.page.html',
  styleUrls: ['./lesson-detail-edit.page.scss'],
})
export class LessonDetailEditPage implements OnInit {

  public property: any;
  public title: any;
  public pageNum: any;
  public value:"";
  constructor(private activatedRoute: ActivatedRoute,
    public router: Router,
    public httpService: HttpServiceService,
    public http: HttpClient) {
  }

  ngOnInit() {
      this.activatedRoute.queryParams.subscribe(queryParams => {
      this.property = queryParams.property;
      this.title = queryParams.title;
      this.pageNum = queryParams.pageNum;
      var params = {
        code: localStorage.getItem("lesson_no")
      }
      var api = '/courses';
      this.httpService.get(api, params).then(async (response: any) => {
        if(this.pageNum == "1"){//学习要求
          this.value = response.data.require;
        }else if(this.pageNum == "2"){//学习进度
          this.value = response.data.process;
        }else{//考试安排
          this.value = response.data.test;
        }
      })
    });
  }
  updateLesson(pageNum){
    var params = {
      code: localStorage.getItem("lesson_no")
    }
    if(pageNum == '1'){
      params["require"] = this.value;
    }else if(pageNum = '2'){
      params["process"] = this.value;
    }else{
      params["test"] = this.value;
    }
    var api = '/courses';
    this.httpService.patch(api, params).then(async (response: any) => {
      // console.log(response);
  })
}

}
