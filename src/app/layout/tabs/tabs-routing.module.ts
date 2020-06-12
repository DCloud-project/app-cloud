import { NgModule } from '@angular/core';
import { RouterModule, Routes,ActivatedRoute } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'member',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../lesson/member/member.module').then(m => m.MemberPageModule)
          }
        ]
      },
      // {
      //   path: 'activities',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () =>
      //         import('../lesson/activities/activities.module').then(m => m.ActivitiesPageModule)
      //     }
      //   ]
      // },
      // {
      //   path: 'message',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () =>
      //         import('../lesson/message/message.module').then(m => m.MessagePageModule)
      //     }
      //   ]
      // },
      {
        path: 'detail',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../lesson/detail/detail.module').then(m => m.DetailPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/member',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/member',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
