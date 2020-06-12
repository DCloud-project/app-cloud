import { Component, OnInit } from '@angular/core';
import { AlertController, PickerController, ToastController } from '@ionic/angular';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-createlesson',
  templateUrl: './createlesson.page.html',
  styleUrls: ['./createlesson.page.scss'],
})
export class CreatelessonPage implements OnInit {

  lesson = {
    class: "",
    name: "",
    term: "",
    school: "",
    isSchoolLesson: "",
    require: "未设置",
    process: "未设置",
    examination: "未设置"
  }
  public markSchool = "true"
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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public httpService: HttpServiceService,
    public http: HttpClient,
    private alertController: AlertController,
    private toastController: ToastController,
    public pickerController: PickerController
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      // this.property = queryParams.property;
      // this.pageNum = queryParams.pageNum;
      if (queryParams.pageNum == '1') {
        this.lesson.require = queryParams.property;
      } else if (queryParams.pageNum == '2') {
        this.lesson.process = queryParams.property;
      } else if(queryParams.pageNum == '3'){
        this.lesson.examination = queryParams.property;
      }
    });
  }

  ngOnInit() {
    //请求后台数据
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
              } else {
                this.academyChoosed = value.col.text;
                this.selectedAcademy = selected[0].options[value.col.value].code;
                this.lesson.school += "/" + this.selectedAcademy;
              }

            }
            console.log(this.lesson.school);
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

  onCreate(form: NgForm) {
    if (form.valid) {
      if (this.markSchool) {
        this.lesson.isSchoolLesson = "1";
      } else {
        this.lesson.isSchoolLesson = "0";
      }
      var params = this.lesson;
      params["email"] = localStorage.getItem("email");
      var api = '/courses';//后台接口
      this.httpService.post(api, params).then(async (response: any) => {
        console.log(response.data);
        const alert = await this.alertController.create({
          header: '创建班课成功',
          message: '班课号为'+response.data,
          buttons: [
            {
              text: '确认',
              cssClass: 'secondary',
              handler: (blah) => {
                this.router.navigateByUrl('/lesson-tabs');
              }
            }
          ]
        });
        await alert.present();
      })

    }
    // console.log(this.lesson.class);
    // if(this.lesson.class == ""){
    //   let toast = await this.toastController.create({
    //     message: '班课班级不能为空！',
    //     duration: 2000
    //   });
    //   toast.present();
    // }else if(this.lesson.name == ""){
    //   let toast = await this.toastController.create({
    //     message: '班课名称不能为空！',
    //     duration: 2000
    //   });
    //   toast.present();
    // }else if(this.lesson.term == ""){
    //   let toast = await this.toastController.create({
    //     message: '班课学期不能为空！',
    //     duration: 2000
    //   });
    //   toast.present();
    // }
    console.log(this.lesson);
    //请求后台 将参数存入数据库course

    //coursestudent也要存
  }

}
