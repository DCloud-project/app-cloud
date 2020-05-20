import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatelessonPageRoutingModule } from './createlesson-routing.module';

import { CreatelessonPage } from './createlesson.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatelessonPageRoutingModule
  ],
  declarations: [CreatelessonPage]
})
export class CreatelessonPageModule {}
