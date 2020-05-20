import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClickPageRoutingModule } from './click-routing.module';

import { ClickPage } from './click.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClickPageRoutingModule
  ],
  declarations: [ClickPage]
})
export class ClickPageModule {}
