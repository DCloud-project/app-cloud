import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FillInforPageRoutingModule } from './fill-infor-routing.module';

import { FillInforPage } from './fill-infor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FillInforPageRoutingModule
  ],
  declarations: [FillInforPage]
})
export class FillInforPageModule {}
