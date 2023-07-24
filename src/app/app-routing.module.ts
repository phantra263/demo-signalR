import { NgModule } from '@angular/core';
import { AppGuard } from './guards/app.guard';
import { AuthGuard } from './guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './pages/user/listUser/listUser.component';
import { DetailUserComponent } from './pages/user/detailUser/detailUser.component';
import { PushNotiComponent } from './pages/user/pushNoti/pushNoti.component';
import { LoginComponent } from './pages/login/login.component';
import { ListNotiComponent } from './pages/user/listNoti/listNoti.component';
import { DetailNotiComponent } from './pages/user/detailNoti/detailNoti.component';

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
          { path: 'chitiet/:id', component: DetailUserComponent, data: { breadcrumb: 'Chi tiết nhân viên' } }
        ]
       },
       { 
        path: 'pushnoti',
        component: PushNotiComponent,
        data: { breadcrumb: 'Demo push noti' }
       },
       { 
        path: 'listnoti',
        data: { breadcrumb: 'List noti' },
        children: [
          { path: '', component: ListNotiComponent, data: { breadcrumb: '' } },
          { path: 'chitiet/:id', component: DetailNotiComponent, data: { breadcrumb: 'Chi tiết thông báo' } }
        ]
       }
    ]
  },

  { path: '**', redirectTo: 'page/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
