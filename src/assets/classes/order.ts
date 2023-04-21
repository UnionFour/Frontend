import { DelayedProduct } from "./delayed-product";

export class Order{
  productQuantity: DelayedProduct[];

  constructor(delayedProduct: DelayedProduct[]) {
    this.productQuantity = delayedProduct;
  }

  appendProduct(newProduct: DelayedProduct) {
    this.productQuantity.push(newProduct);
  }
}
