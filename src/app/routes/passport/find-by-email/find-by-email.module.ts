import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindByEmailPageRoutingModule } from './find-by-email-routing.module';

import { FindByEmailPage } from './find-by-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindByEmailPageRoutingModule
  ],
  declarations: [FindByEmailPage]
})
export class FindByEmailPageModule {}
