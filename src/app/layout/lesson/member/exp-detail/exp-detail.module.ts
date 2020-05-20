import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpDetailPageRoutingModule } from './exp-detail-routing.module';

import { ExpDetailPage } from './exp-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpDetailPageRoutingModule
  ],
  declarations: [ExpDetailPage]
})
export class ExpDetailPageModule {}
