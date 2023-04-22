import { DelayedProduct } from "./delayed-product";

export class Order{
  productNames: Map<string, DelayedProduct>;
  orderSum: number;

  constructor(product: DelayedProduct) {
    this.productNames = new Map<string, DelayedProduct>();
    this.append(product);
    this.orderSum = this.getOrderSum();
  }

  append(product: DelayedProduct) {
    if (this.productNames.has(product.name)) {
      let changedProduct = this.productNames.get(product.name);
      changedProduct!.PlusCount(product.count);
    } else {
      this.productNames.set(product.name, product);
    }
    this.orderSum = this.getOrderSum();
  }

  getOrderSum() {
    let sum: number = 0;
    for (let product of this.productNames.values()) {
      sum += product.totalAmount;
    }
    return sum;
  }
}
