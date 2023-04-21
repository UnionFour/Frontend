import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/assets/classes/product'

@Injectable({
  providedIn: 'root',
})

export class SelectingProductsService {
  public changedProduct$ = new Subject<Product>();
  public selectedProducts = new Map<string, Product>();

  public addSelectedProduct(newProduct: Product) {
    this.changedProduct$.next(newProduct);
    this.selectedProducts.set(newProduct.name, newProduct);
  }

  public removeSelectedProduct(removableProduct: Product) {
    if (this.selectedProducts.has(removableProduct.name)) {
      this.selectedProducts.delete(removableProduct.name);
      this.changedProduct$.next(removableProduct);
    }
  }
}
