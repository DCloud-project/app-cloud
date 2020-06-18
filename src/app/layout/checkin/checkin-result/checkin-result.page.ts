import { Component, OnInit } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-checkin-result',
  templateUrl: './checkin-result.page.html',
  styleUrls: ['./checkin-result.page.scss'],
})
export class CheckinResultPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController) { }
  public absenceList = [
    {
      name: "小明",
      sno: "19898329",
      id: "1",
      checked: false
    },
    {
      name: "小明",
      sno: "19898329",
      id: "2",
      checked: false
    }
  ];
  public attendanceList = [
    {
      name: "小明",
      sno: "19898329",
      id: "1",
      checked: false
    },
    {
      name: "小明",
      sno: "19898329",
      id: "2",
      checked: false
    }
  ]
  public show = false;
  public checkText = "多选";
  public isSelectAllAbsence = false;
  public isSelectAllAttendance = false;
  ngOnInit() {

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
    console.log(this.isSelectAllAbsence);
    this.isSelectAllAbsence=!this.isSelectAllAbsence;

    if (this.isSelectAllAbsence == true) {
      this.absenceList.forEach(item => {
        item.checked = true;
      });
      this.isSelectAllAbsence = false;
      // console.log(this.isSelectAll)
    } else {
      console.log("ooo")
      this.isSelectAllAbsence = true;
      this.absenceList.forEach(item => {
        item.checked = false;
      });
    }

  }
  checkAbsence(item) {
    let sum = 0;
    this.absenceList.forEach(item1 => {
      console.log(item1)
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
    this.isSelectAllAttendance=!this.isSelectAllAttendance;

    if (this.isSelectAllAttendance == true) {
      this.attendanceList.forEach(item => {
        item.checked = true;
      });
      this.isSelectAllAttendance = false;
    } else {
      console.log("ooo")
      this.isSelectAllAttendance = true;
      this.attendanceList.forEach(item => {
        item.checked = false;
      });
    }

  }
  checkAttendance(item) {
    let sum = 0;
    this.attendanceList.forEach(item1 => {
      console.log(item1)
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
  deleteItem(item) {
    this.absenceList.splice(this.absenceList.indexOf(item), 1);
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
      }, {
        text: '设为迟到',
        icon: 'alarm-outline',
        handler: () => {
          console.log('Favorite clicked');
        }
      },
      {
        text: '设为早退',
        icon: 'exit-outline',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
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

}
