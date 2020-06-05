import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateLessonPageRoutingModule } from './update-lesson-routing.module';

import { UpdateLessonPage } from './update-lesson.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateLessonPageRoutingModule
  ],
  declarations: [UpdateLessonPage]
})
export class UpdateLessonPageModule {}
