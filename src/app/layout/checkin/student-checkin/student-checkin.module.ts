import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentCheckinPageRoutingModule } from './student-checkin-routing.module';

import { StudentCheckinPage } from './student-checkin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentCheckinPageRoutingModule
  ],
  declarations: [StudentCheckinPage]
})
export class StudentCheckinPageModule {}
