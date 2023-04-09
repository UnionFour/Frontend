import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-last-orders',
  templateUrl: './last-orders.component.html',
  styleUrls: ['./last-orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastOrdersComponent {
  index = 0;

  readonly itemsCount = 4;

  readonly items = [
    {title: 'Пепперони фреш', content: 'от 289 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
    {title: '3 пиццы', content: 'от 1289 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
    {title: 'Пепперони фреш', content: 'от 289 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
    {title: '3 пиццы', content: 'от 1289 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
    {title: 'Пепперони фреш', content: 'от 289 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
    {title: '3 пиццы', content: 'от 1289 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
    {title: 'Пепперони фреш', content: 'от 289 ₽', imgSrc: 'assets/img/last_orders_picture1.png'},
    {title: '3 пиццы', content: 'от 1289 ₽', imgSrc: 'assets/img/last_orders_picture1.png'}
  ];

  get rounded(): number {
    return Math.floor(this.index / this.itemsCount);
  }

  onIndex(index: number): void {
    this.index = index * this.itemsCount;
  }
}
