import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { HttpServiceService } from '../../services/http-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-member',
  templateUrl: './search-member.component.html',
  styleUrls: ['./search-member.component.scss'],
})
export class SearchMemberComponent implements OnInit {

  public searchMember = []
  public memberNo:any = 0;
  constructor(public navParams:NavParams,
    public httpService: HttpServiceService,
    public http: HttpClient,) { }

  ngOnInit() {}
  dissmissSearch(){
    this.navParams.data.modal.dismiss();
  }
  getData($event){
    //传给后台搜索的内容
    var params={
      code:localStorage.getItem("lesson_no"),
      search:$event.detail.value,
      order:localStorage.getItem("isNo")
    }
    var api = '/courses/member';//后台接口
    this.httpService.get(api, params).then(async (response: any) => {
      this.searchMember = response.data;
      this.memberNo = this.searchMember.length;
    })
  }

}
