import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DelegatComponent } from './delegat/delegat.component';
import { VodjaComponent } from './vodja/vodja.component';
import { Pocetak1Component } from './pocetak1/pocetak1.component';
import { Pocetak2Component } from './pocetak2/pocetak2.component';

const routes: Routes = [
  {path: '', component: UserComponent},
  {path: 'pocetak1', component: Pocetak1Component/*, data: {breadcrumb: 'Почетак'}*/},
  {path: 'pocetak2', component: Pocetak2Component/*, data: {breadcrumb: 'Преглед'}*/},
  {path: 'login', component: LoginComponent/*, data: {breadcrumb: 'Пријављивање'}*/},
  {path: 'user', component: UserComponent/*, data: {breadcrumb: 'Корисник'}*/},
  {path: 'admin', component: AdminComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'promena', component: PromenaLozinkeComponent},
  {path: 'delegat', component: DelegatComponent},
  {path: 'vodja', component: VodjaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgxPaginationModule],
  exports: [RouterModule, NgxPaginationModule]
})
export class AppRoutingModule { }
