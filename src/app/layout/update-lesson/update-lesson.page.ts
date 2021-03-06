import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { HttpClient } from '@angular/common/http';
import { AlertController, PickerController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

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
  term = [[]];
  course = [[]];
  termOptions = 12;
  courseOptions: number;

  constructor(
    public httpService: HttpServiceService,
    public http: HttpClient,
    private alertController: AlertController,
    private router: Router,
    public pickerController: PickerController,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      // if(queryParams.name == '1'){
      if (queryParams.name != undefined) {
        this.lesson.name = queryParams.name;
        if (this.course[0][this.course.length - 1] != queryParams.name) {
          this.course[0].push(this.lesson.name);
          this.courseOptions++;
        }
      }
      // }
    });

  }

  ngOnInit() {
    this.getLesson();
    this.getTime();
    //请求后台数据
    var api = '/courseManage';//后台接口
    this.httpService.getAll(api).then(async (response: any) => {

      // this.courseList = response.data;
      for (var i = 0; i < response.data.length; i++) {
        this.course[0].push(response.data[i].name);
      }
      this.courseOptions = this.course[0].length;
    })
  }

  getLesson() {
    var params = {
      code: localStorage.getItem("lesson_no")
    }
    var api = '/courses';
    this.httpService.get(api, params).then(async (response: any) => {
      this.lesson = response.data;
      // console.log(response.data);
    })
  }
  onUpdate() {
    var params = {
      code: localStorage.getItem("lesson_no"),
      class: this.lesson.class,
      name: this.lesson.name,
      tname: this.lesson.tname,
      type: this.lesson.type,
      term: this.lesson.term
    }
    // console.log(params)
    var api = '/courses';
    this.httpService.patch(api, params).then(async (response: any) => {
      // console.log(response.data.respCode);
      if (response.data.respCode == 1) {
        const alert = await this.alertController.create({
          header: '提示',
          message: '编辑成功！',
          buttons: [
            {
              text: '确认',
              cssClass: 'secondary',
              handler: (blah) => {
                this.router.navigate(['/tabs/detail'], {
                  queryParams: {
                    term: this.lesson.term,
                    name: this.lesson.name,
                    tname: this.lesson.tname,
                    class: this.lesson.class,
                    type: this.lesson.type
                  }
                })
                // this.router.navigateByUrl('/tabs/detail');
                // location.replace('/tabs/detail');
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

  getTime() {
    let myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();
    for (var i = 0; i < 6; i++) {
      var start = year + i - 2;
      var end = start + 1;
      this.term[0].push(start + "-" + end + "-01");
      this.term[0].push(start + "-" + end + "-02");
    }
    this.term[0].push("不设置学期")
  }

  async termPicker(numColumns = 1, numOptions, columnOptions) {

    const picker = await this.pickerController.create({
      columns: this.getTermColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确认',
          handler: (value) => {
            // console.log(value.col.text);
            this.lesson.term = value.col.text;
          }
        }
      ]
    });

    await picker.present();
  }

  getTermColumns(numColumns, numOptions, columnOptions) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col`,
        options: this.getTermColumnOptions(i, numOptions, columnOptions)
      });
    }

    return columns;
  }

  getTermColumnOptions(columnIndex, numOptions, columnOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      })
    }

    return options;
  }


  async coursePicker(numColumns = 1, numOptions, columnOptions) {

    const picker = await this.pickerController.create({
      columns: this.getCourseColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确认',
          handler: (value) => {
            // console.log(value.col.text);
            this.lesson.name = value.col.text;
          }
        }
      ]
    });

    await picker.present();
  }

  getCourseColumns(numColumns, numOptions, columnOptions) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col`,
        options: this.getCourseColumnOptions(i, numOptions, columnOptions)
      });
    }

    return columns;
  }

  getCourseColumnOptions(columnIndex, numOptions, columnOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      })
    }

    return options;
  }

  toAdd() {
    this.router.navigateByUrl('/add-lesson-name');
    localStorage.setItem("isCreate", '0');
  }
}
