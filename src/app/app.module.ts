import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PromotionsComponent } from './promotions/promotions.component';
import {TuiCarouselModule, TuiIslandModule, TuiPaginationModule} from "@taiga-ui/kit";
import { LastOrdersComponent } from './last-orders/last-orders.component';
import { FiltersComponent } from './filters/filters.component';
import { GoodsSectionComponent } from './goods-section/goods-section.component';
import { FooterComponent } from './footer/footer.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PromocodeFieldComponent } from './promocode-field/promocode-field.component';
import { HomeComponent } from './home/home.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {GoodCardComponent} from "./good-card/good-card.component";
import { ShopCartItemComponent } from './shop-cart-item/shop-cart-item.component';

const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'cabinet', component: CabinetComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    PromotionsComponent,
    LastOrdersComponent,
    FiltersComponent,
    GoodsSectionComponent,
    FooterComponent,
    ShoppingCartComponent,
    PromocodeFieldComponent,
    HomeComponent,
    CabinetComponent,
    GoodCardComponent,
    ShopCartItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiCarouselModule,
    TuiPaginationModule,
    TuiIslandModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
