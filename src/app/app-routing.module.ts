import { NgModule } from '@angular/core';
import { HomeComponent } from './features/home/home.component';
import { CabinetComponent } from './features/cabinet/cabinet.component';
import { LoginComponent } from './core/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { OrderingComponent } from './features/ordering/ordering.component';
import { OrderingGuard } from './ordering.guard';
import { GameComponent } from './features/game/game.component';
import { AboutUsComponent } from './features/about-us/about-us.component';

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
export class AppRoutingModule {
}
