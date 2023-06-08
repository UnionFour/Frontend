import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-last-orders',
  templateUrl: './last-orders.component.html',
  styleUrls: ['./last-orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastOrdersComponent implements OnInit{

  public isAuthorized: boolean;

  public index: number = 0;
  public itemsCount: number = 4;

  readonly items = [
    {title: 'Пепперони', content: 'от 299 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
    {title: 'Пепперони', content: 'от 299 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
    {title: 'Пепперони', content: 'от 299 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
    {title: 'Пепперони', content: 'от 299 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
    {title: 'Пепперони', content: 'от 299 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
    {title: 'Пепперони', content: 'от 299 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
    {title: 'Пепперони', content: 'от 299 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
  ];

  constructor(private readonly _authService: AuthService, public changeRef: ChangeDetectorRef) {
    this.isAuthorized = !!window.localStorage['jwt'];
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
      context.isAuthorized = isAuthorized;
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
}
