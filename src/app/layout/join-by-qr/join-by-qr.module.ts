import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinByQRPageRoutingModule } from './join-by-qr-routing.module';

import { JoinByQRPage } from './join-by-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinByQRPageRoutingModule
  ],
  declarations: [JoinByQRPage]
})
export class JoinByQRPageModule {}
