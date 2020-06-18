import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLessonNamePageRoutingModule } from './add-lesson-name-routing.module';

import { AddLessonNamePage } from './add-lesson-name.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLessonNamePageRoutingModule
  ],
  declarations: [AddLessonNamePage]
})
export class AddLessonNamePageModule {}
