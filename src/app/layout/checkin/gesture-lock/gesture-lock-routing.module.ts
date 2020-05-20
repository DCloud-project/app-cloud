import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestureLockPage } from './gesture-lock.page';

const routes: Routes = [
  {
    path: '',
    component: GestureLockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestureLockPageRoutingModule {}
