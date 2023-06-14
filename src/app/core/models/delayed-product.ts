import { Product } from "./product";

export class DelayedProduct extends Product{
  amount: number;
  totalCost: number;

  constructor(product: Product, count: number = 1) {
    super(product.productId, product.name, product.description, product.category, product.price, product.picture);
    this.amount = count;
    this.totalCost = product.price;
  }

  plusAmount(count: number = 1): void {
    this.amount += count;
    this.totalCost += this.price * count;
  }

  minusAmount(count: number = 1): void {
    if (this.amount > count) {
      this.amount -= count;
      this.totalCost -= this.price * count;
    }
  }
}
