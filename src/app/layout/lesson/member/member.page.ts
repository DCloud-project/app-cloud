import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {SearchComponent} from '../../../shared/components/search/search.component'

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {
  public lesson = {
    no: '',
    name: ''
  };
  public isNo='1';
  public member = [
    {
      name: '小丸子',
      sno: '190327991',
      dept:'计算机专硕1班',
      sex: '1',
      exp:'15'
    },
    {
      name: '小丸子',
      sno: '190327991',
      dept:'计算机专硕1班',
      sex: '1',
      exp:'15'
    },
    {
      name: '小丸子',
      sno: '190327991',
      dept:'计算机专硕1班',
      sex: '1',
      exp:'15'
    }
  ]
  constructor(public modalController: ModalController) {
    this.lesson.name = localStorage.getItem("lesson_name");
    this.lesson.no = localStorage.getItem("lesson_no");
  }

  ngOnInit() {

  }

  orderByNo(){
    this.isNo = '0';
    //按学号排序List
  }
  orderByExp(){
    this.isNo = '1';
    //按经验值排序list
  }
  async searchMember(){
    //弹出搜索模态框
    const modal = await this.modalController.create({
      component: SearchComponent,
      componentProps: {
        type: '按照姓名、学号检索'
      }
    });
    await modal.present();
  }

}
