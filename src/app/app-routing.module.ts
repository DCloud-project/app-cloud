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
    path: 'manual',
    loadChildren: () => import('./layout/checkin/manual/manual.module').then( m => m.ManualPageModule)
  },
  {
    path: 'createlesson',
    loadChildren: () => import('./layout/createlesson/createlesson.module').then( m => m.CreatelessonPageModule)
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
    path: 'update-inf',
    loadChildren: () => import('./layout/user/update-inf/update-inf.module').then( m => m.UpdateInfPageModule)
  },
  {
    path: 'lesson-edit',
    loadChildren: () => import('./layout/lesson-edit/lesson-edit.module').then( m => m.LessonEditPageModule)
  },
  {
    path: 'lesson-detail-edit',
    loadChildren: () => import('./layout/lesson-detail-edit/lesson-detail-edit.module').then( m => m.LessonDetailEditPageModule)
  },
  {
    path: 'update-lesson',
    loadChildren: () => import('./layout/update-lesson/update-lesson.module').then( m => m.UpdateLessonPageModule)
  },
  // {
  //   path: 'update-inf',
  //   loadChildren: () => import('./layout/user/update-inf/update-inf.module').then( m => m.UpdateInfPageModule)
  // },
  // {
  //   path: 'base-axios',
  //   loadChildren: () => import('./shared/services/base-axios/base-axios.module').then( m => m.BaseAxiosPageModule)
  // },
  {
    path: 'user-inf',
    loadChildren: () => import('./layout/user/user-inf/user-inf.module').then( m => m.UserInfPageModule)
  },
  {
    path: 'checkin-result',
    loadChildren: () => import('./layout/checkin/checkin-result/checkin-result.module').then( m => m.CheckinResultPageModule)
  },
  {
    path: 'student-checkin',
    loadChildren: () => import('./layout/checkin/student-checkin/student-checkin.module').then( m => m.StudentCheckinPageModule)
  },
  {
    path: 'add-lesson-name',
    loadChildren: () => import('./layout/add-lesson-name/add-lesson-name.module').then( m => m.AddLessonNamePageModule)
  },
  {
    path: 'create-success',
    loadChildren: () => import('./layout/create-success/create-success.module').then( m => m.CreateSuccessPageModule)
  },
  {
    path: 'qr-scanner',
    loadChildren: () => import('./layout/qr-scanner/qr-scanner.module').then( m => m.QrScannerPageModule)
  },
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
