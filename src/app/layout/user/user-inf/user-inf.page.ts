import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { PickerController } from '@ionic/angular';
@Component({
  selector: 'app-user-inf',
  templateUrl: './user-inf.page.html',
  styleUrls: ['./user-inf.page.scss'],
})
export class UserInfPage implements OnInit {
  public user = {
    email: localStorage.getItem("email"),
    image: "1",
    role: "",
    sno: "",
    school: "1",
    sex: "1",
    telphone: "1",
    nickname: "1",
    name: "1",
    birth: "1",
    exp: "1"
  };

  constructor(public router: Router, public httpService: HttpServiceService,
    public http: HttpClient,
    public pickerController:PickerController) { }

  // pickerController = document.querySelector('ion-picker-controller');
  defaultColumnOptions = [
    [
      'Dog',
      'Cat',
      'Bird',
      'Lizard',
      'Chinchilla'
    ]
  ]

  multiColumnOptions = [
    [
      'Minified',
      'Responsive',
      'Full Stack',
      'Mobile First',
      'Serverless'
    ],
    [
      'Tomato',
      'Avocado',
      'Onion',
      'Potato',
      'Artichoke'
    ]
  ]
  ngOnInit() {
    var params = {//后台所需参数
      email: localStorage.getItem("email"),
    };
    var api = '/user/info';//后台接口
    this.httpService.get(api, params).then(async (response: any) => {
      console.log(response);
      if (response.status == 200) {
        this.user = response.data;
        this.user["email"] = localStorage.getItem("email");
      }
    })
  }

  //编辑个人信息
  updateInf() {
    // if (form.valid) {
      var params = {
        email: this.user.email,
        iamge: "0",
        sno: this.user.sno,
        school: this.user.school,
        sex: this.user.sex,
        nickname: this.user.nickname,
        telphone:"172837628",
        name: this.user.name,
        birth: this.user.birth,
      }
      var api = '/user/info';//后台接口
      this.httpService.put(api, params).then(async (response: any) => {
        console.log(response);
        // if (response.status == 200) {
        //   //修改密码成功，跳转到登录页
        //   this.user = response.data;
        //   this.user["email"] = localStorage.getItem("email");
        // }
      })
    // }
  }
  onLogout(){
    localStorage.setItem("isLogin", "0");
    this.router.navigateByUrl('');
  }

  // async openPicker(numColumns = 1, numOptions = 5, columnOptions = this.defaultColumnOptions){
  //   const picker = this.pickerController.create({
  //     columns: this.getColumns(numColumns, numOptions, columnOptions),
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel'
  //       },
  //       {
  //         text: 'Confirm',
  //         handler: (value) => {
  //           console.log(`Got Value ${value}`);
  //         }
  //       }
  //     ]
  //   });

  //   (await picker).present();
  // }

  // getColumns(numColumns, numOptions, columnOptions) {
  //   let columns = [];
  //   for (let i = 0; i < numColumns; i++) {
  //     columns.push({
  //       name: `col-${i}`,
  //       options: this.getColumnOptions(i, numOptions, columnOptions)
  //     });
  //   }

  //   return columns;
  // }

  // getColumnOptions(columnIndex, numOptions, columnOptions) {
  //   let options = [];
  //   for (let i = 0; i < numOptions; i++) {
  //     options.push({
  //       text: columnOptions[columnIndex][i % numOptions],
  //       value: i
  //     })
  //   }
  //   return options;
  // }
  async  openPicker(numColumns = 1, numOptions = 5, multiColumnOptions) {
    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, multiColumnOptions),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log(`Got Value ${value}`);
          }
        }
      ]
    });
    await picker.present();
  }

  getColumns(numColumns, numOptions, columnOptions) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }
    return columns;
  }

  getColumnOptions(columnIndex, numOptions, columnOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      })
    }
    return options;
  }
  
}
