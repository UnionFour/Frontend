import { Component, OnInit } from '@angular/core';
import { SelectingProductsService } from "../services/selecting-products";
import { DelayedProduct } from "../../assets/classes/delayed-product";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']

})
export class ShoppingCartComponent implements OnInit {

  delayedProducts: Array<DelayedProduct> = Array<DelayedProduct>();
  sum: number = 0;

  constructor(private selectingProductsService: SelectingProductsService) {}

  ngOnInit() {
    this.selectingProductsService.changedProduct$.subscribe(
      (changedProduct) => {
        this.delayedProducts.push(new DelayedProduct(changedProduct));
        this.sum = this.getOrderSum();
      });
  }

  getOrderSum() {
    let prices: Array<number> = this.delayedProducts.map((product) => product.price)
    return prices.reduce(function (currentSum, currentNumber) {
      return currentSum + currentNumber}, 0)
  }
}
