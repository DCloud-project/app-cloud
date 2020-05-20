import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpDetailPage } from './exp-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ExpDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpDetailPageRoutingModule {}
