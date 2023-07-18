import { NgModule } from '@angular/core';
import { AppGuard } from './guards/app.guard';
import { AuthGuard } from './guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './pages/user/listUser/listUser.component';
import { DetailUserComponent } from './pages/user/detailUser/detailUser.component';
import { PushNotiComponent } from './pages/user/pushNoti/pushNoti.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AppGuard],
    children: [
       { 
        path: 'nhanvien',
        data: { breadcrumb: 'Danh sách nhân viên' },
        children: [
          { path: '', component: ListUserComponent, data: { breadcrumb: '' } },
          { path: 'chitiet/:id', component: DetailUserComponent, data: { breadcrumb: 'Chi tiết đơn tuyển' } }
        ]
       },
       { 
        path: 'pushnoti',
        component: PushNotiComponent,
        data: { breadcrumb: 'Demo push noti' }
       },
    ]
  },

  { path: '**', redirectTo: 'page/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
