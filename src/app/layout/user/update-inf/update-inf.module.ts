import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateInfPageRoutingModule } from './update-inf-routing.module';

import { UpdateInfPage } from './update-inf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateInfPageRoutingModule
  ],
  declarations: [UpdateInfPage]
})
export class UpdateInfPageModule {}
