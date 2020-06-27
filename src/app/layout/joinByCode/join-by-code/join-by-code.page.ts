import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-join-by-code',
  templateUrl: './join-by-code.page.html',
  styleUrls: ['./join-by-code.page.scss'],
})
export class JoinByCodePage implements OnInit {

  public code = '';
  constructor(
    private router: Router,
    public httpService: HttpServiceService,
    public http: HttpClient,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  joinLesson() {
    var params = {
      // email: localStorage.getItem("email"),
      code: this.code
    }
    var api = '/courses';//后台接口
    this.httpService.post(api, params).then(async (response: any) => {
      if (response.status == 200) {
        if (response.data.respCode == "班课号不存在！") {
          const alert = await this.alertController.create({
            header: '警告',
            message: '班课号不存在！',
            buttons: ['确认']
          });
          await alert.present();
        } else {
          //获得班课信息
          localStorage.setItem("joinCode",this.code); 
          localStorage.setItem("joinInf",JSON.stringify(response.data)); 
          this.router.navigateByUrl("/confirm-join");
        }
      }

    })


  }
}
