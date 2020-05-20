import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatelessonPage } from './createlesson.page';

const routes: Routes = [
  {
    path: '',
    component: CreatelessonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatelessonPageRoutingModule {}
