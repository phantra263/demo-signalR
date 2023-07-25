import { NgModule } from '@angular/core';
import { AppGuard } from './guards/app.guard';
import { AuthGuard } from './guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { ListHinhAnhComponent } from './pages/user/listHinhAnh/listHinhAnh.component';
import { DetailHinhAnhComponent } from './pages/user/detailHinhAnh/detailHinhAnh.component';
import { PushNotiComponent } from './pages/user/pushNoti/pushNoti.component';
import { LoginComponent } from './pages/login/login.component';
import { ListNotiComponent } from './pages/user/listNoti/listNoti.component';
import { DetailNotiComponent } from './pages/user/detailNoti/detailNoti.component';
import { ChatComponent } from './pages/user/chat/chat.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AppGuard],
    children: [
       { 
        path: 'hinhanh',
        data: { breadcrumb: 'Danh sách hình ảnh' },
        children: [
          { path: '', component: ListHinhAnhComponent, data: { breadcrumb: '' } },
          { path: 'chitiet/:id', component: DetailHinhAnhComponent, data: { breadcrumb: 'Chi tiết hình ảnh' } }
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
          // { path: 'chitiet/:id', component: DetailNotiComponent, data: { breadcrumb: 'Chi tiết thông báo' }}
        ]
       },
       { 
        path: 'chat',
        data: { breadcrumb: 'List chat' },
        children: [
          { path: '', component: ChatComponent, data: { breadcrumb: '' } },
          { path: ':id', component: ChatComponent, data: { breadcrumb: 'detail' } },
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
