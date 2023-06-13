import { DelayedProduct } from "./delayed-product";

export class Order{
  productNames: Map<string, DelayedProduct>;
  orderSum: number;

  constructor(product: DelayedProduct) {
    this.productNames = new Map<string, DelayedProduct>();
    this.append(product);
    this.orderSum = this.getOrderSum();
  }

  public append(product: DelayedProduct): void {
    if (this.productNames.has(product.name)) {
      let changedProduct: DelayedProduct | undefined = this.productNames.get(product.name);
      changedProduct!.plusCount(product.count);
    } else {
      this.productNames.set(product.name, product);
    }
    this.orderSum = this.getOrderSum();
  }

  public getOrderSum(): number {
    let sum: number = 0;
    for (let product of this.productNames.values()) {
      sum += product.totalAmount;
    }
    return sum;
  }

  public removeProduct(productName: string): void {
    if (this.productNames.has(productName)) {
      this.productNames.delete(productName);
    }
  }
}
