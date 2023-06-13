import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/core/models/product'
import { DelayedProduct } from "../models/delayed-product";
import { Order } from 'src/app/core/models/order'

@Injectable({
  providedIn: 'root',
})
export class SelectingProductsService {
  public changedProduct$: Subject<Product> = new Subject<Product>();
  public selectedProducts: Map<string, Product> = new Map<string, Product>();
  public order: Order | undefined;

  public addSelectedProduct(newProduct: Product): void {
    this.changedProduct$.next(newProduct);
    this.selectedProducts.set(newProduct.name, newProduct);

    if (!this.order) {
      this.order = new Order(new DelayedProduct(newProduct));
    } else {
      this.order.append(new DelayedProduct(newProduct));
    }
  }

  public removeSelectedProduct(removableProduct: Product): void {
    if (this.selectedProducts.has(removableProduct.name)) {
      this.selectedProducts.delete(removableProduct.name);
      this.changedProduct$.next(removableProduct);
    }
  }
}
