import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinByCodePage } from './join-by-code.page';

const routes: Routes = [
  {
    path: '',
    component: JoinByCodePage
  },
  {
    path: 'confirm-join',
    loadChildren: () => import('../confirm-join/confirm-join.module').then( m => m.ConfirmJoinPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinByCodePageRoutingModule {}
