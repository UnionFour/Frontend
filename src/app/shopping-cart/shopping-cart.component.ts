import {Component, OnInit } from '@angular/core';
import { SelectingProductsService } from "../services/selecting-products";
import { DelayedProduct } from "../../assets/classes/delayed-product";
import { Order } from "../../assets/classes/order";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']

})
export class ShoppingCartComponent implements OnInit {
  order!: Order;
  renderingProducts: Array<DelayedProduct> = new Array<DelayedProduct>();
  delayedProducts: Array<DelayedProduct> = new Array<DelayedProduct>();
  delayedProductsMap: Map<string, DelayedProduct> = new Map<string, DelayedProduct>();
  sum: number = 0;

  constructor(private selectingProductsService: SelectingProductsService) {}

  ngOnInit() {
    this.selectingProductsService.changedProduct$.subscribe(
      (changedProduct) => {
        if (!this.order) {
          this.order = new Order(new DelayedProduct(changedProduct));
        } else {
          this.order.append(new DelayedProduct(changedProduct));
        }
        this.updateRendering();
      });
  }

  updateRendering() {
    this.renderingProducts = new Array<DelayedProduct>();
    for (let product of this.order.productNames.values()) {
      this.renderingProducts.push(product);
    }
    this.order.orderSum = this.order.getOrderSum();
  }

  onChangeProductCount() {
    this.updateRendering();
  }
}
