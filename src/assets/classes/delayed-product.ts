import { Product } from "./product";

export class DelayedProduct extends Product{
  count: number;

  constructor(name: string, description: string, category: string, price: number, count: number) {
    super(name, description, category, price);
    this.count = count;
  }
}
