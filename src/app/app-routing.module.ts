import { NgModule } from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {CabinetComponent} from "./cabinet/cabinet.component";
import {LoginComponent} from "./login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./auth.guard";
import {OrderingComponent} from "./ordering/ordering.component";
import {OrderingGuard} from "./ordering.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{
      path: 'ordering',
      component: OrderingComponent,
      canActivate: [OrderingGuard, AuthGuard]
    }]
  },
  {
    path: 'cabinet',
    component: CabinetComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{
}
