import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DelayedProduct } from "../../assets/classes/delayed-product";

@Component({
  selector: 'shop-cart-item',
  templateUrl: './shop-cart-item.component.html',
  styleUrls: ['./shop-cart-item.component.css']
})
export class ShopCartItemComponent implements OnInit{
  @Input() product!: DelayedProduct;
  @Output() onPlusOne = new EventEmitter<DelayedProduct>();
  @Output() onMinusOne = new EventEmitter<DelayedProduct>();
  public count: number = 0;
  public sum: number = 0;

  ngOnInit() {
    this.count = this.product.count;
    this.sum = this.product.totalAmount;
  }

  PlusOne() {
    this.product.PlusCount();
    this.count = this.product.count;
    this.sum = this.product.totalAmount;
  }

  MinusOne() {
    this.product.MinusCount();
    this.count = this.product.count;
    this.sum = this.product.totalAmount;
  }
}
