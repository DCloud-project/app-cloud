import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClickPage } from './click.page';

const routes: Routes = [
  {
    path: '',
    component: ClickPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClickPageRoutingModule {}
