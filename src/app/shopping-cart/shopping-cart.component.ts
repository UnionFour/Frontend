import { Component, OnInit } from '@angular/core';
import { SelectingProductsService } from "../services/selecting-products";
import { Product } from "../../assets/classes/product";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']

})
export class ShoppingCartComponent implements OnInit {

  products: Array<Product> = Array<Product>();
  sum: number = 0;

  constructor(private selectingProductsService: SelectingProductsService) {}

  ngOnInit() {
    this.selectingProductsService.changedProduct$.subscribe(
      (changedProduct) => {
        this.products.push(changedProduct);
        this.sum = this.getOrderSum();
      });
  }

  getOrderSum() {
    let prices: Array<number> = this.products.map((product) => product.price)
    return prices.reduce(function (currentSum, currentNumber) {
      return currentSum + currentNumber}, 0)
  }
}
