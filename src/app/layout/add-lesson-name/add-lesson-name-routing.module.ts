import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLessonNamePage } from './add-lesson-name.page';

const routes: Routes = [
  {
    path: '',
    component: AddLessonNamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLessonNamePageRoutingModule {}
