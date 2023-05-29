import { NgModule } from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {CabinetComponent} from "./cabinet/cabinet.component";
import {LoginComponent} from "./login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./auth.guard";
import {OrderingComponent} from "./ordering/ordering.component";
import {OrderingGuard} from "./ordering.guard";
import {GameComponent} from "./game/game.component";
import {AboutUsComponent} from "./about-us/about-us.component";

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
    path: 'game',
    component: GameComponent,
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutUsComponent,
    pathMatch: 'full'
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
