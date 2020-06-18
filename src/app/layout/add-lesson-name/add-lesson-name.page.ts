import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-lesson-name',
  templateUrl: './add-lesson-name.page.html',
  styleUrls: ['./add-lesson-name.page.scss'],
})
export class AddLessonNamePage implements OnInit {
  lesson = {
    type: "1",
    name: "",
    description: ""
  }

  constructor(
    public httpService: HttpServiceService,
    public http: HttpClient,
    public alertController: AlertController,
    public router: Router) { }

  ngOnInit() {
  }

  onAdd(form: NgForm) {
    if (form.valid) {
      var params = {
        name: this.lesson.name,
        type: this.lesson.type,
        description: this.lesson.description,
        email: localStorage.getItem("email")
      }
      var api = "/courseManage"
      this.httpService.post(api, params).then(async (response: any) => {
        if (response.data.respCode == 1) {

          const alert = await this.alertController.create({
            message: '新增课程成功',
            buttons: [
              {
                text: '确认',
                cssClass: 'secondary',
                handler: (blah) => {
                  this.router.navigate(['/createlesson'], {
                    queryParams: {
                      name: this.lesson.name
                    }
                  })
                }
              }
            ]
          });
          await alert.present();
        } else if (response.data.respCode == "课程名称不允许重复！") {
          const alert = await this.alertController.create({
            message: '课程名称不允许重复！',
            buttons: [
              {
                text: '确认',
                cssClass: 'secondary'
              }
            ]
          });
          await alert.present();
        }
      })
    }
  }

}
