import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateInfPage } from './update-inf.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateInfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateInfPageRoutingModule {}
