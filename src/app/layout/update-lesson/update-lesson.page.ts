import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-lesson',
  templateUrl: './update-lesson.page.html',
  styleUrls: ['./update-lesson.page.scss'],
})
export class UpdateLessonPage implements OnInit {
  public lesson = {
    no: '88888888',
    name: '工程训练',
    checked: true,
    tname: '池老师',
    class: '计算机专硕1班',
    term: '2019-2020 1',
    type: true,
    school: '福州大学 数学与计算机科学学院',
    require: '未设置',
    process: '未设置',
    test: '未设置'

  };

  constructor(
    public httpService: HttpServiceService,
    public http: HttpClient,
    private alertController: AlertController,
    private router:Router 
  ) { 
    this.getLesson();
  }

  ngOnInit() {
  }

  getLesson(){
    var params = {
      code: localStorage.getItem("lesson_no")
    }
    var api = '/courses';
    this.httpService.get(api, params).then(async (response: any) => {
      this.lesson = response.data;
      console.log(response.data);
    })
}
  onUpdate(){
    var params = {
      code: localStorage.getItem("lesson_no"),
      class: this.lesson.class,
      name:this.lesson.name,
      tname:this.lesson.tname,
      type:this.lesson.type
    }
    console.log(params)
    var api = '/courses';
    this.httpService.patch(api, params).then(async (response: any) => {
      console.log(response.data.respCode);
      if(response.data.respCode == 1){
        const alert = await this.alertController.create({
          header: '提示',
          message: '编辑成功！',
          buttons: [
            {
              text: '确认',
              cssClass: 'secondary',
              handler: (blah) => {
                // this.router.navigateByUrl('/tabs/detail');
                location.replace('/tabs/detail');
                // location.reload();
              }
            }
          ]
        });
        await alert.present();
      // })
      }
      // this.getLesson();
      // this.lesson = response.data;
    })
  }

}
