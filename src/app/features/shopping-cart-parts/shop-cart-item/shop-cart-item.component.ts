import { Input, Component, Output, EventEmitter } from '@angular/core';
import { DelayedProduct } from "../../../core/models/delayed-product";

@Component({
  selector: 'shop-cart-item',
  templateUrl: './shop-cart-item.component.html',
  styleUrls: ['./shop-cart-item.component.css']
})
export class ShopCartItemComponent {
  @Input() product!: DelayedProduct;

  @Output() onPlusOne = new EventEmitter<DelayedProduct>();
  @Output() onMinusOne = new EventEmitter<DelayedProduct>();
  @Output() onRemove = new EventEmitter<DelayedProduct>();

  plusOne() {
    this.product.plusAmount(1);
    this.onPlusOne.emit(this.product);
  }

  minusOne() {
    this.product.minusAmount(1);
    this.onMinusOne.emit(this.product);
  }

  removeProduct() {
    this.onRemove.emit(this.product);
  }
}
