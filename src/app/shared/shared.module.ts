import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import {SearchComponent} from './components/search/search.component'
import {CheckinComponent} from './components/checkin/checkin.component'



@NgModule({
  declarations: [SearchComponent,CheckinComponent],
  imports: [
    CommonModule, IonicModule,RouterModule
  ],
  exports:[SearchComponent,CheckinComponent],
  entryComponents:[SearchComponent,CheckinComponent]
})
export class SharedModule { }
