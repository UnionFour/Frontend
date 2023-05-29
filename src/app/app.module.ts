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
import {HeaderComponent} from './header/header.component';
import {NavigationComponent} from './navigation/navigation.component';
import {PromotionsComponent} from './promotions/promotions.component';
import {
  TuiCarouselModule, TuiDataListWrapperModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiIslandModule,
  TuiPaginationModule, TuiSelectModule
} from "@taiga-ui/kit";
import {LastOrdersComponent} from './last-orders/last-orders.component';
import {FiltersComponent} from './filters/filters.component';
import {GoodsSectionComponent} from './goods-section/goods-section.component';
import {FooterComponent} from './footer/footer.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {PromocodeFieldComponent} from './promocode-field/promocode-field.component';
import {HomeComponent} from './home/home.component';
import {CabinetComponent} from './cabinet/cabinet.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GoodCardComponent} from "./good-card/good-card.component";
import {ShopCartItemComponent} from './shop-cart-item/shop-cart-item.component';
import {OrderingComponent} from './ordering/ordering.component';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import {AppRoutingModule} from "./app-routing.module";
import {GameComponent} from "./game/game.component";
import {AboutUsComponent} from "./about-us/about-us.component";

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
    ShopCartItemComponent,
    OrderingComponent,
    LoginComponent,
    GameComponent,
    AboutUsComponent
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
