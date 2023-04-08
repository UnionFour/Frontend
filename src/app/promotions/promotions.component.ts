import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromotionsComponent {
  index = 2;

  readonly items = [
    'assets/img/promotion1.png',
    'assets/img/promotion2.png',
    'assets/img/promotion3.png',
    'assets/img/promotion4.png',
    'assets/img/promotion5.png'
  ];
}
