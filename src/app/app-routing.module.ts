import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./routes/passport/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./layout/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./routes/passport/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./routes/passport/verify/verify.module').then( m => m.VerifyPageModule)
  },
  // {
  //   path: 'create',
  //   loadChildren: () => import('./layout/lesson/create/create.module').then( m => m.CreatePageModule)
  // },
  // {
  //   path: 'join',
  //   loadChildren: () => import('./layout/lesson/join/join.module').then( m => m.JoinPageModule)
  // },
  {
    path: 'lesson-tabs',
    loadChildren: () => import('./layout/lesson-tabs/lesson-tabs.module').then( m => m.LessonTabsPageModule)
  },
  // {
  //   path: 'user-inf',
  //   loadChildren: () => import('./layout/user/user-inf/user-inf.module').then( m => m.UserInfPageModule)
  // },
  // {
  //   path: 'mylesson',
  //   loadChildren: () => import('./layout/lesson/mylesson/mylesson.module').then( m => m.MylessonPageModule)
  // },
  // {
  //   path: 'member',
  //   loadChildren: () => import('./layout/member/member.module').then( m => m.MemberPageModule)
  // },
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
