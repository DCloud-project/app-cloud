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
    path: 'verify/:email',
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

  {
    path: 'choose',
    loadChildren: () => import('./layout/checkin/choose/choose.module').then( m => m.ChoosePageModule)
  },
  {
    path: 'click',
    loadChildren: () => import('./layout/checkin/click/click.module').then( m => m.ClickPageModule)
  },
  {
    path: 'gesture',
    loadChildren: () => import('./layout/checkin/gesture/gesture.module').then( m => m.GesturePageModule)
  },
  {
    path: 'manual',
    loadChildren: () => import('./layout/checkin/manual/manual.module').then( m => m.ManualPageModule)
  },
  {
    path: 'createlesson',
    loadChildren: () => import('./layout/createlesson/createlesson.module').then( m => m.CreatelessonPageModule)
  },
  {
    path: 'gesture-lock',
    loadChildren: () => import('./layout/checkin/gesture-lock/gesture-lock.module').then( m => m.GestureLockPageModule)
  },
  {
    path: 'change-pass',
    loadChildren: () => import('./routes/passport/change-pass/change-pass.module').then( m => m.ChangePassPageModule)
  },
  {
    path: 'join-by-code',
    loadChildren: () => import('./layout/joinByCode/join-by-code/join-by-code.module').then( m => m.JoinByCodePageModule)
  },
  {
    path: 'confirm-join',
    loadChildren: () => import('./layout/joinByCode/confirm-join/confirm-join.module').then( m => m.ConfirmJoinPageModule)
  },
  {
    path: 'join-by-qr',
    loadChildren: () => import('./layout/join-by-qr/join-by-qr.module').then( m => m.JoinByQRPageModule)
  },
  {
    path: 'update-inf',
    loadChildren: () => import('./layout/user/update-inf/update-inf.module').then( m => m.UpdateInfPageModule)
  },
  // {
  //   path: 'base-axios',
  //   loadChildren: () => import('./shared/services/base-axios/base-axios.module').then( m => m.BaseAxiosPageModule)
  // },
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
