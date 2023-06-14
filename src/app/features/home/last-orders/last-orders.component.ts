import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {LastOrdersLoadingService} from "../../../core/services/last-orders-loading.service";
import {SelectingProductsService} from "../../../core/services/selecting-products.service";

type LastProducts = {
  productId: string,
  name: string,
  price: number,
  picture: string
}[];

@Component({
  selector: 'app-last-orders',
  templateUrl: './last-orders.component.html',
  styleUrls: ['./last-orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastOrdersComponent implements OnInit{

  public showLastOrder: boolean = false;
  public lastProducts: LastProducts = [];
  public index: number = 0;
  public itemsCount: number = 4;

  constructor(private readonly _authService: AuthService,
              public changeRef: ChangeDetectorRef,
              private readonly _lastOrdersLoadingService: LastOrdersLoadingService,
              private readonly _selectingProductsService: SelectingProductsService) {
    this._lastOrdersLoadingService.lastProducts$.subscribe((lastProducts: LastProducts): void => {
      this.lastProducts = lastProducts;
      this.showLastOrder = (!!window.localStorage['jwt'] && this.lastProducts.length > 0);
      this.changeRef.markForCheck();
    });
    if (window.innerWidth < 1190 && window.innerWidth >= 800) {
      this.itemsCount = 3;
      this.changeRef.markForCheck();
    } else if (window.innerWidth < 800) {
      this.itemsCount = 2;
      this.changeRef.markForCheck();
    }
  }

  public ngOnInit(): void {
    const context: LastOrdersComponent = this;
    this._authService.authorization$.subscribe((isAuthorized: boolean): void => {
      context.showLastOrder = (isAuthorized && this.lastProducts.length > 0);
      context.changeRef.markForCheck();
    });
    window.onresize = function (): void {
      if (window.innerWidth >= 1190 && context.itemsCount !== 4) {
        context.itemsCount = 4;
        context.changeRef.markForCheck();
      } else if (window.innerWidth < 1190 && window.innerWidth >= 800 && context.itemsCount !== 3) {
        context.itemsCount = 3;
        context.changeRef.markForCheck();
      } else if (window.innerWidth < 800 && context.itemsCount !== 2) {
        context.itemsCount = 2;
        context.changeRef.markForCheck();
      }
    };
  }

  get rounded(): number {
    return Math.floor(this.index / this.itemsCount);
  }

  onIndex(index: number): void {
    this.index = index * this.itemsCount;
  }

  public appendProduct(product: any): void {
    console.log(product);
  }
}
