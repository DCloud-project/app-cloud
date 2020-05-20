import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestureLockPageRoutingModule } from './gesture-lock-routing.module';

import { GestureLockPage } from './gesture-lock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestureLockPageRoutingModule
  ],
  declarations: [GestureLockPage]
})
export class GestureLockPageModule {}
