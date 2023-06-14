import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiButtonModule,
  TuiDialogModule,
  TuiFormatPhonePipeModule,
  TuiRootModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/header/header.component';
import {NavigationComponent} from './shared/navigation/navigation.component';
import {PromotionsComponent} from './features/home/promotions/promotions.component';
import {
  TuiCarouselModule, TuiDataListWrapperModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiIslandModule,
  TuiPaginationModule, TuiSelectModule
} from "@taiga-ui/kit";
import {LastOrdersComponent} from './features/home/last-orders/last-orders.component';
import {FilterSortComponent} from './features/home/filter-sort/filter-sort.component';
import {GoodsSectionComponent} from './features/goods-media/goods-section/goods-section.component';
import {FooterComponent} from './shared/footer/footer.component';
import {ShoppingCartComponent} from './features/shopping-cart-parts/shopping-cart/shopping-cart.component';
import {PromocodeFieldComponent} from './features/shopping-cart-parts/promocode-field/promocode-field.component';
import {HomeComponent} from './features/home/home.component';
import {CabinetComponent} from './features/cabinet/cabinet.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GoodCardComponent} from "./features/goods-media/good-card/good-card.component";
import {ShopCartItemComponent} from './features/shopping-cart-parts/shop-cart-item/shop-cart-item.component';
import {OrderingComponent} from './features/ordering/ordering.component';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './core/login/login.component';
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import {AppRoutingModule} from "./app-routing.module";
import {GameComponent} from "./features/game/game.component";
import {AboutUsComponent} from "./features/about-us/about-us.component";
import {ComponentHostDirective} from "./shared/directives/component-host.directive";
import {SortComponent} from "./features/home/filter-sort/sort/sort.component";
import {MessageModalComponent} from "./shared/message-modal/message-modal.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    PromotionsComponent,
    LastOrdersComponent,
    FilterSortComponent,
    GoodsSectionComponent,
    FooterComponent,
    ShoppingCartComponent,
    PromocodeFieldComponent,
    HomeComponent,
    CabinetComponent,
    GoodCardComponent,
    ShopCartItemComponent,
    OrderingComponent,
    LoginComponent,
    GameComponent,
    AboutUsComponent,
    ComponentHostDirective,
    SortComponent,
    MessageModalComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiCarouselModule,
    TuiPaginationModule,
    TuiIslandModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiInputDateModule,
    GraphQLModule,
    TuiButtonModule,
    HttpClientModule,
    TuiInputModule,
    FormsModule,
    TuiFormatPhonePipeModule,
    TuiInputPhoneModule,
    NgxMaskDirective,
    NgxMaskPipe,
    TuiSelectModule,
    TuiDataListWrapperModule
  ],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}, provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule {
}
