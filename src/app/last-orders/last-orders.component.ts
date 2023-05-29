import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-last-orders',
  templateUrl: './last-orders.component.html',
  styleUrls: ['./last-orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastOrdersComponent implements OnInit{

  public isAuthorized: boolean;

  index = 0;
  readonly itemsCount = 4;

  readonly items = [
    {title: 'Пепперони фреш', content: 'от 289 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
    {title: 'Пепперони фреш', content: 'от 289 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
    {title: 'Пепперони фреш', content: 'от 289 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
    {title: 'Пепперони фреш', content: 'от 289 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
    {title: 'Пепперони фреш', content: 'от 289 ₽', imgSrc: 'assets/img/last_orders_picture1.png'}
  ];

  constructor(private readonly _authService: AuthService, public changeRef: ChangeDetectorRef) {
    console.log('компонента имеет:' + !!window.localStorage['jwt']);
    this.isAuthorized = !!window.localStorage['jwt'];
  }

  public ngOnInit(): void {
    const context: LastOrdersComponent = this;
    this._authService.authorization$.subscribe((isAuthorized: boolean): void => {
      console.log('компонента имеет:' + isAuthorized);
      context.isAuthorized = isAuthorized;
      context.changeRef.markForCheck();
    });
  }

  get rounded(): number {
    return Math.floor(this.index / this.itemsCount);
  }

  onIndex(index: number): void {
    this.index = index * this.itemsCount;
  }
}
