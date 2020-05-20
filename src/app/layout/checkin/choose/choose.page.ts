import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CheckinComponent } from '../../../shared/components/checkin/checkin.component'
import { Router } from '@angular/router'

@Component({
  selector: 'app-choose',
  templateUrl: './choose.page.html',
  styleUrls: ['./choose.page.scss'],
})
export class ChoosePage implements OnInit {

  public record = [
    {
      date:'2020-02-29',
      day:'星期六',
      time:'11:57',
      event:'签到',
      checkNum:'2',
      total:'2'
    },
    {
      date:'2020-02-29',
      day:'星期六',
      time:'11:57',
      event:'签到',
      checkNum:'2',
      total:'2'
    }, {
      date:'2020-02-29',
      day:'星期六',
      time:'11:57',
      event:'签到',
      checkNum:'2',
      total:'2'
    }
  ]
  constructor(public modalController: ModalController, public router: Router) { }

  async checkExplain() {
    console.log("签到方式说明");
    //弹出说明模态框
    const modal = await this.modalController.create({
      component: CheckinComponent,

    });
    await modal.present();
  }
  gotoClick() {
    console.log("dddd");
    this.router.navigateByUrl('click');
  }

  gotoGesture() {
    this.router.navigateByUrl('gesture');
  }

  gotoManual() {
    this.router.navigateByUrl('manual');
  }

  ngOnInit() {
  }



}
