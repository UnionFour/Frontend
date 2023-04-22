import { Input, Component, Output, EventEmitter } from '@angular/core';
import { DelayedProduct } from "../../assets/classes/delayed-product";

@Component({
  selector: 'shop-cart-item',
  templateUrl: './shop-cart-item.component.html',
  styleUrls: ['./shop-cart-item.component.css']
})
export class ShopCartItemComponent {
  @Input() product!: DelayedProduct;

  @Output() onPlusOne = new EventEmitter<DelayedProduct>();
  @Output() onMinusOne = new EventEmitter<DelayedProduct>();

  PlusOne() {
    this.product.PlusCount(1);
    this.onPlusOne.emit(this.product);
  }

  MinusOne() {
    this.product.MinusCount(1);
    this.onMinusOne.emit(this.product);
  }
}
