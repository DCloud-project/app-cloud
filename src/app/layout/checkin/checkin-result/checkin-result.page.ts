import { HttpServiceService } from 'src/app/shared/services/http-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';
import { ActionSheetController, ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-checkin-result',
  templateUrl: './checkin-result.page.html',
  styleUrls: ['./checkin-result.page.scss'],
})
export class CheckinResultPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    public router: Router,
    public loadingController: LoadingController,
    public httpService: HttpServiceService) { }
  public absenceList = [];
  public attendanceList = []
  public show = false;
  public checkText = "多选";
  public isSelectAllAbsence = false;
  public isSelectAllAttendance = false;
  public attendanceTotal = 0;
  public absenceTotal = 0;
  public api = "/attendenceResult";
  ngOnInit() {
    this.getData();
  }
  showCheck() {

    if (this.show == false) {
      this.show = true;
      this.checkText = "取消多选";
    } else {
      this.show = false;
      this.checkText = "多选";
    }
  }
  selectAllAbsence() {
    this.isSelectAllAbsence = !this.isSelectAllAbsence;

    if (this.isSelectAllAbsence == true) {
      this.absenceList.forEach(item => {
        item.checked = true;
      });
      this.isSelectAllAbsence = false;
    } else {
      this.isSelectAllAbsence = true;
      this.absenceList.forEach(item => {
        item.checked = false;
      });
    }

  }
  checkAbsence(item) {
    let sum = 0;
    this.absenceList.forEach(item1 => {
      if (item1.checked == true && item1 != item) {
        sum += 1;
      }
      else if (item1.checked == false) {
        if (item1 == item && item.checked == false) {
          sum += 1;
        } else {
          this.isSelectAllAbsence = false;
        }
      }
    });
    if (sum == this.absenceList.length) {
      this.isSelectAllAbsence = true;
    } else {
      this.isSelectAllAbsence = false;
    }

  }
  selectAllAttendance() {
    this.isSelectAllAttendance = !this.isSelectAllAttendance;

    if (this.isSelectAllAttendance == true) {
      this.attendanceList.forEach(item => {
        item.checked = true;
      });
      this.isSelectAllAttendance = false;
    } else {
      this.isSelectAllAttendance = true;
      this.attendanceList.forEach(item => {
        item.checked = false;
      });
    }

  }
  checkAttendance(item) {
    let sum = 0;
    this.attendanceList.forEach(item1 => {
      if (item1.checked == true && item1 != item) {
        sum += 1;
      }
      else if (item1.checked == false) {
        if (item1 == item && item.checked == false) {
          sum += 1;
        } else {
          this.isSelectAllAttendance = false;
        }
      }
    });
    if (sum == this.attendanceList.length) {
      this.isSelectAllAttendance = true;
    } else {
      this.isSelectAllAttendance = false;
    }

  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '设置',
      cssClass: 'my-custom-class',
      buttons: [{
        text: '设为缺勤',
        role: 'destructive',
        icon: 'heart-dislike-outline',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: '设为请假',
        icon: 'mail-outline',
        handler: () => {
          console.log('Share clicked');
        }
      },
      //  {
      //   text: '设为迟到',
      //   icon: 'alarm-outline',
      //   handler: () => {
      //     console.log('Favorite clicked');
      //   }
      // },
      // {
      //   text: '设为早退',
      //   icon: 'exit-outline',
      //   handler: () => {
      //     console.log('Favorite clicked');
      //   }
      // }, 
      {
        text: '设为已签到',
        icon: 'heart-outline',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: '取消',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async getData() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
    var params = {
      code: localStorage.getItem("lesson_no"),
      attend_id: localStorage.getItem("attend_id")
    }
    this.httpService.patch(this.api, params).then(async (response: any) => {
      await loading.dismiss();
      this.absenceList = response.data[0];
      this.absenceTotal = response.data[0][response.data[0].length - 1].total;
      this.absenceList.splice(this.absenceList.length - 1)

      this.attendanceList = response.data[1];
      this.attendanceTotal = response.data[1][response.data[1].length - 1].total;
      this.attendanceList.splice(this.attendanceList.length - 1)
    })
  }

  setState(){

  }
  setAllState(){
    var sum=0;
    console.log("000");
    this.absenceList.forEach(item => {
      if(item.checked==true){
        sum+=1;
      }
    });
    this.attendanceList.forEach(item => {
      if(item.checked==true){
        sum+=1;
      }
    });
    if(this.isSelectAllAttendance==true||this.isSelectAllAbsence==true||sum>0){
      console.log("ok")
    }
  }

}
