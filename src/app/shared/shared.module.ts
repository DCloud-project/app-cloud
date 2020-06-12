import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import {SearchComponent} from './components/search/search.component';
import {SearchMemberComponent} from './components/search-member/search-member.component'
import {CheckinComponent} from './components/checkin/checkin.component'



@NgModule({
  declarations: [SearchComponent,CheckinComponent,SearchMemberComponent],
  imports: [
    CommonModule, IonicModule,RouterModule
  ],
  exports:[SearchComponent,CheckinComponent,SearchMemberComponent],
  entryComponents:[SearchComponent,CheckinComponent,SearchMemberComponent]
})
export class SharedModule { }
