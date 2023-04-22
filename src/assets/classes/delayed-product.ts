import { Product } from "./product";

export class DelayedProduct extends Product{
  count: number;
  totalAmount: number;

  constructor(product: Product, count: number = 1) {
    super(product.name, product.description, product.category, product.price, product.imgPath);
    this.count = count;
    this.totalAmount = product.price;
  }

  PlusCount(count: number = 1) {
    this.count += count;
    this.totalAmount += this.price * count;
  }

  MinusCount(count: number = 1) {
    if (this.count > count) {
      this.count -= count;
      this.totalAmount -= this.price * count;
    }
  }
}
