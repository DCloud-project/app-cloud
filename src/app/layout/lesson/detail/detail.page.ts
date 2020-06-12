import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PickerController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public lesson = {
    no: '88888888',
    name: '工程训练',
    checked: true,
    tname: '池老师',
    class: '计算机专硕1班',
    term: '2019-2020 1',
    type: "",
    school: '',
    require: '未设置',
    process: '未设置',
    test: '未设置'

  };
  public checked = 1;

  school = [[]]
  academy = [[]]
  schoolList = {}
  academyList = {}
  public flag = 0;
  public schoolChoosed = "未设置"
  public academyChoosed = "未设置"
  public academyId;
  public schoolOptions = 0;
  public academyOptions = 0;
  selectedSchool: any;
  selectedAcademy: string;
  public isTeacher: any;

  constructor(
    public httpService: HttpServiceService,
    public http: HttpClient,
    private activatedRoute: ActivatedRoute,
    public pickerController: PickerController,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      // this.property = queryParams.property;
      // this.pageNum = queryParams.pageNum;
      if (queryParams.pageNum == '1') {
        this.lesson.require = queryParams.property;
      } else if (queryParams.pageNum == '2') {
        this.lesson.process = queryParams.property;
      } else if (queryParams.pageNum == '3') {
        this.lesson.test = queryParams.property;
      }
    });
    this.lesson.name = localStorage.getItem("lesson_name");
    this.lesson.no = localStorage.getItem("lesson_no");
    this.isTeacher = localStorage.getItem("isTeacher");
    this.getLesson();
  }
  async  openPicker(numColumns = 1, numOptions, multiColumnOptions, isSchool) {
    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, multiColumnOptions, isSchool),
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确认',
          handler: (value) => {
            var selected = this.getColumns(numColumns, numOptions, multiColumnOptions, isSchool);
            if (isSchool == 1) {
              this.flag = 1;
              this.academyId = selected[0].options[value.col.value].id;
              this.schoolChoosed = value.col.text;
              this.lesson.school = "";
              this.selectedSchool = selected[0].options[value.col.value].code;
              this.lesson.school += this.selectedSchool;
              //获取学院列表
              this.academy[0].length = 0;
              var param = {
                academy: this.academyId,
              }
              this.academyChoosed = '未设置';
              var api = '/schools';//后台接口
              this.httpService.get(api, param).then(async (response: any) => {
                for (var i = 0; i < response.data.length; i++) {
                  this.academy[0].push(response.data[i].name);
                }
                this.academyList = response.data;
                this.academyOptions = this.academy[0].length;
              })
            } else {
              this.flag++;//2
              if (this.flag > 2) {
                this.flag--;
                this.lesson.school = this.selectedSchool;
              }
              if (this.lesson.school.length == 0) {
                console.log("请先选择学校");
              } else if(this.lesson.school.indexOf("/") == -1){//不含"/""
                this.academyChoosed = value.col.text;
                this.selectedAcademy = selected[0].options[value.col.value].code;
                this.lesson.school += "/" + this.selectedAcademy;
              }else{
                // console.log(selected[0].options[value.col.value].code);
                //更新后面的学院
                var index = this.lesson.school.indexOf("/");
                this.lesson.school = this.lesson.school.substr(0,index);
                this.academyChoosed = value.col.text;
                this.selectedAcademy = selected[0].options[value.col.value].code;
                this.lesson.school += "/" + this.selectedAcademy;

              }

            }
            console.log(this.lesson.school);
            //更新
            var params_update = {
              code: localStorage.getItem("lesson_no"),
              school: this.lesson.school
            }
            var api_update = '/courses';
            this.httpService.patch(api_update, params_update).then(async (response: any) => {
              console.log(response);
            })
          }
        }
      ]
    });
    await picker.present();
  }

  getColumns(numColumns, numOptions, columnOptions, isSchool) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col`,
        options: this.getColumnOptions(i, numOptions, columnOptions, isSchool)
      });
    }
    return columns;
  }

  getColumnOptions(columnIndex, numOptions, columnOptions, isSchool) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      if (isSchool == 1) {
        for (let j = 0; j < this.schoolOptions; j++) {
          if (this.schoolList[j].name == columnOptions[columnIndex][i % numOptions]) {
            options.push({
              text: columnOptions[columnIndex][i % numOptions],
              value: i,
              code: this.schoolList[j].code,
              id: this.schoolList[j].id
            })
          }
        }
      } else {
        for (let j = 0; j < this.academyOptions; j++) {
          if (this.academyList[j].name == columnOptions[columnIndex][i % numOptions]) {
            options.push({
              text: columnOptions[columnIndex][i % numOptions],
              value: i,
              code: this.academyList[j].code,
              id: this.academyList[j].id
            })
          }
        }
      }
    }
    return options;
  }

  updateJoin() {
    var params = {
      code: localStorage.getItem("lesson_no"),
      isjoin: this.lesson.checked
    }
    console.log(params)
    var api = '/courses';
    this.httpService.patch(api, params).then(async (response: any) => {
      // console.log(response);
      // this.getLesson();
      // this.lesson = response.data;
    })
  }

  getLesson() {
    var params = {
      code: localStorage.getItem("lesson_no")
    }
    var api = '/courses';
    this.httpService.get(api, params).then(async (response: any) => {
      this.lesson = response.data;
      console.log(response.data);
      // console.log(this.lesson);
      if (this.lesson.school == null) {
        this.lesson.school = "未设置";
      } else {
        //获取学校名称
        var str = this.lesson.school.split("/");
        var api = '/schools/getCode';//后台接口
        this.httpService.get(api, { code: str[0] }).then(async (response: any) => {
          this.schoolChoosed = response.data;
        })
        this.httpService.get(api, { code: str[1] }).then(async (response: any) => {
          this.academyChoosed = response.data;
        })
        //获取学院列表
        this.academy[0].length = 0;
        var param1 = {
          schoolCode: str[0],//父级id
        }
        this.academyChoosed = '未设置';
        var api = '/schools';//后台接口
        this.httpService.get(api, param1).then(async (response: any) => {
          for (var i = 0; i < response.data.length; i++) {
            this.academy[0].push(response.data[i].name);
          }
          this.academyList = response.data;
          this.academyOptions = this.academy[0].length;
          console.log(this.academyList);
        })
      }
      if (this.lesson.require == null) {
        if (this.isTeacher == '1') {
          this.lesson.require = "未设置";
        } else {
          this.lesson.require = "暂无内容";
        }

      }
      if (this.lesson.process == null) {
        if (this.isTeacher == '1') {
          this.lesson.process = "未设置";
        } else {
          this.lesson.process = "暂无内容";
        }

      }
      if (this.lesson.test == null) {
        if (this.isTeacher == '1') {
          this.lesson.test = "未设置";
        } else {
          this.lesson.test = "暂无内容";
        }

      }
      if (response.data.type.toString() == "true") {
        this.lesson.type = "学校课表班课";
      } else {
        this.lesson.type = "非学校课表班课";
      }
    })
    //请求后台数据
    if (this.isTeacher == '1') {
      this.school[0].length = 0;
      var param = {
        school: 1,
      }
      var api = '/schools';//后台接口
      this.httpService.get(api, param).then(async (response: any) => {
        this.schoolList = response.data;
        for (var i = 0; i < response.data.length; i++) {
          this.school[0].push(response.data[i].name);
        }
        this.schoolOptions = this.school[0].length;
      })
    }
  }

  deleteLesson() {
    var params = {
      code: localStorage.getItem("lesson_no")
    }
    var api = '/courses';
    this.httpService.delete(api, params).then(async (response: any) => {
      if (response.data.respCode == 1) {
        const alert = await this.alertController.create({
          header: '提示',
          message: '是否确认删除？',
          buttons: [
            {
              text: '取消',
              role: 'cancel',
              cssClass: 'medium'
            }, {
              text: '确认',
              handler: async () => {
                const alert = await this.alertController.create({
                  // header: '提示',
                  message: '删除成功！',
                  buttons: [{
                    text: "确认",
                    handler: () => {
                      location.replace('/lesson-tabs');
                    }
                  }]
                });
                await alert.present();
              }
            }
          ]
        });
        await alert.present();
      }
    })
  }

  outLesson() {
    var params = {
      code: localStorage.getItem("lesson_no"),
      email: localStorage.getItem("email")
    }
    var api = '/courses';
    this.httpService.delete(api, params).then(async (response: any) => {
      if (response.data.respCode == 1) {
        const alert = await this.alertController.create({
          header: '提示',
          message: '是否确认退出？',
          buttons: [
            {
              text: '取消',
              role: 'cancel',
              cssClass: 'medium'
            }, {
              text: '确认',
              handler: async () => {
                const alert = await this.alertController.create({
                  // header: '提示',
                  message: '退出成功！',
                  buttons: [{
                    text: "确认",
                    handler: () => {
                      location.replace('/lesson-tabs');
                    }
                  }]
                });
                await alert.present();
              }
            }
          ]
        });
        await alert.present();
      }
    })
  }
}
