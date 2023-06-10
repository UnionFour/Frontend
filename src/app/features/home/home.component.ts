import {Component} from '@angular/core';
import {LoadingProductsService} from "../../core/services/loading-products.service";
import {Product} from "../../core/models/product";
import {ProductCategory} from "../../core/models/product-category";

@Component({
  selector: 'app-home-media',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public categories: ProductCategory[] = [];

  constructor(private readonly _loadingProductsService: LoadingProductsService) {
    this._loadingProductsService.loadedCategories$.subscribe((categories: ProductCategory[]): void => {
      this.categories = categories;

      //убрать
      categories.forEach((category: ProductCategory): void => {
        this.categories.push(category);
      })
    });
  }
}
