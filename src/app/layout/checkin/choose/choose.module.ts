import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoosePageRoutingModule } from './choose-routing.module';

import { ChoosePage } from './choose.page';
import {SharedModule} from '../../../shared/shared.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ChoosePageRoutingModule
  ],
  declarations: [ChoosePage]
})
export class ChoosePageModule {}
