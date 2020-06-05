import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateLessonPage } from './update-lesson.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateLessonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateLessonPageRoutingModule {}
