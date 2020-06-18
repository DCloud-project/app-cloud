import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentCheckinPage } from './student-checkin.page';

const routes: Routes = [
  {
    path: '',
    component: StudentCheckinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentCheckinPageRoutingModule {}
