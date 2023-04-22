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
    this.renderingProducts = Array.from(this.order.productNames.values());
    this.order.orderSum = this.order.getOrderSum();
  }

  onChangeProductCount() {
    this.order.orderSum = this.order.getOrderSum();
  }

  onRemoveProduct(removedProduct: DelayedProduct) {
    this.order.removeProduct(removedProduct.name);
    this.updateRendering();
  }
}
