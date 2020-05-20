import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MylessonPageRoutingModule } from './mylesson-routing.module';

import { MylessonPage } from './mylesson.page';
import {SharedModule} from '../../shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MylessonPageRoutingModule
  ],
  declarations: [MylessonPage]
})
export class MylessonPageModule {}
