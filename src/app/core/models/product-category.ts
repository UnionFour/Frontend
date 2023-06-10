import {Product} from "./product";

export class ProductCategory {
  public name: string;
  public products: Product[];

  constructor(name: string = '', products: Product[] = []) {
    this.name = name;
    this.products = products;
  }
}
