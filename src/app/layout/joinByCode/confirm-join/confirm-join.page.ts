import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-join',
  templateUrl: './confirm-join.page.html',
  styleUrls: ['./confirm-join.page.scss'],
})
export class ConfirmJoinPage implements OnInit {

  public lesson = {
    class: "",
    name: "",
    tname: "",
    schoolLesson: "学校课表班课"
  }
  constructor(
    private router: Router,
    public httpService: HttpServiceService,
    public http: HttpClient,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    localStorage.getItem("joinInf");
    this.lesson = JSON.parse(localStorage.getItem("joinInf"));
  }

  async confirmJoin() {
    const alert = await this.alertController.create({
      header: '提示',
      message: '确认加入班课？',
      buttons: [
        {
          text: '取消',
        },
        {
          text: '确认',
          cssClass: 'secondary',
          handler: (blah) => {
            var params = {
              email: localStorage.getItem("email"),
              code: localStorage.getItem("joinCode")
            }
            var api = '/courses';//后台接口
            this.httpService.post(api, params).then(async (response: any) => {
              // console.log(response);
              if (response.status == 200) {
                if (response.data.respCode == "您已加入本班课，请勿重复加入！") {
                  const alert = await this.alertController.create({
                    header: '警告',
                    message: '您已加入本班课，请勿重复加入！',
                    buttons: ['确认']
                  });
                  await alert.present();
                } else if (response.data.respCode == "不能加入自己创建的班课！") {
                  const alert = await this.alertController.create({
                    header: '警告',
                    message: '不能加入自己创建的班课！',
                    buttons: ['确认']
                  });
                  await alert.present();

                } else if (response.data.respCode == "1") {
                  const alert = await this.alertController.create({
                    message: '加入班课成功！',
                    buttons: [
                      {
                        text: '确认',
                        cssClass: 'secondary',
                        handler: (blah) => {
                          this.router.navigateByUrl('/lesson-tabs');
                          this.router.navigate(['/lesson-tabs/mylesson'], {
                            queryParams: {
                              join: '1'
                            }
                          })
                        }
                      }
                    ]
                  });
                  await alert.present();

                }
              }
            })

          }
        }
      ]
    });
    await alert.present();

  }

}
