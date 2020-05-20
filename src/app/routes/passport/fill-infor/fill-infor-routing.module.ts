import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FillInforPage } from './fill-infor.page';

const routes: Routes = [
  {
    path: '',
    component: FillInforPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FillInforPageRoutingModule {}
