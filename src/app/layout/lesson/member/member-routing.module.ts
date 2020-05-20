import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberPage } from './member.page';

const routes: Routes = [
  {
    path: '',
    component: MemberPage
  },
  {
    path: 'member-detail',
    loadChildren: () => import('./member-detail/member-detail.module').then( m => m.MemberDetailPageModule)
  },
  {
    path: 'exp-detail',
    loadChildren: () => import('./exp-detail/exp-detail.module').then( m => m.ExpDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberPageRoutingModule {}
