import { Component, OnInit } from '@angular/core';
import { SelectingProductsService } from "../../../core/services/selecting-products.service";
import { DelayedProduct } from "../../../core/models/delayed-product";
import { Order } from "../../../core/models/order";
import { OrderingService } from "../../../core/services/ordering.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']

})
export class ShoppingCartComponent implements OnInit {
  order!: Order;
  renderingProducts: Array<DelayedProduct> = new Array<DelayedProduct>();

  constructor(private selectingProductsService: SelectingProductsService,
              private orderingService: OrderingService,
              private router: Router) {}

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

  sendOrder() {
    this.orderingService.initializeOrder(this.order);
    this.router.navigateByUrl('/ordering').then();
  }
}
