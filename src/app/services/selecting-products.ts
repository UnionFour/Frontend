import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/assets/classes/product'
import { DelayedProduct } from "../../assets/classes/delayed-product";
import { Order } from 'src/assets/classes/order'

@Injectable({
  providedIn: 'root',
})

export class SelectingProductsService {
  public changedProduct$ = new Subject<Product>();
  public selectedProducts = new Map<string, Product>();
  public order: Order | undefined;

  public addSelectedProduct(newProduct: Product) {
    this.changedProduct$.next(newProduct);
    this.selectedProducts.set(newProduct.name, newProduct);

    if (!this.order) {
      this.order = new Order(new DelayedProduct(newProduct));
    } else {
      this.order.append(new DelayedProduct(newProduct));
    }
  }

  public removeSelectedProduct(removableProduct: Product) {
    if (this.selectedProducts.has(removableProduct.name)) {
      this.selectedProducts.delete(removableProduct.name);
      this.changedProduct$.next(removableProduct);
    }
  }
}
