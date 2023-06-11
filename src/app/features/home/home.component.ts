import {Component} from '@angular/core';
import {LoadingProductsService} from "../../core/services/loading-products.service";
import {Product} from "../../core/models/product";
import {ProductCategory} from "../../core/models/product-category";
import {Ingredient} from "../../core/models/ingredient";

@Component({
  selector: 'app-home-media',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public tempCategories: ProductCategory[] = [];
  private _categories: ProductCategory[] = [];

  constructor(private readonly _loadingProductsService: LoadingProductsService) {
    this._loadingProductsService.loadedCategories$.subscribe((categories: ProductCategory[]): void => {
      // убрать (клонирование)
      categories.forEach((category: ProductCategory): void => {
        categories.push(category);
      })

      this.tempCategories = this.cloneCategories(categories);
      this._categories = this.cloneCategories(categories);

      // this.ingredientFilterGoods();
      // this.sortGoods(true);
      // this.resetTempData();
    });
  }

  public cloneCategories(categories: ProductCategory[]): ProductCategory[] {
    return categories.map((category: ProductCategory) => {
      category = Object.assign({}, category);
      category.products = categories[0].products.map((product: Product) => {
        const cloneIngredients: Ingredient[] = product.ingredients.map((ingredient: Ingredient) => {
          return Object.assign({}, ingredient);
        });
        return new Product(
          product.name,
          product.description,
          product.category,
          product.price,
          product.picture,
          cloneIngredients);
      });
      return category;
    });
  }

  public sortGoods(isReverse: boolean = false, sortCriteria: string = 'price'): void {
    this.tempCategories.map((category: ProductCategory): void => {
      category.products.sort((a: Product, b: Product): number => {
        const aMap: Map<string, any> = new Map(Object.entries(a));
        const bMap: Map<string, any> = new Map(Object.entries(b));
        if (aMap.get(sortCriteria) < bMap.get(sortCriteria)) {
          return isReverse ? 1 : -1;
        } else if (aMap.get(sortCriteria) > bMap.get(sortCriteria)) {
          return isReverse? -1 : 1;
        }
        return 0;
      });
    });
  }

  public ingredientFilterGoods(filterValue: string = 'Томаты'): void {
    this.tempCategories.map((category: ProductCategory): void => {
      category.products = category.products.filter((value: Product): boolean => {
        return value.ingredients.map((ingredient: Ingredient): string => {
          return ingredient.name;
        }).includes(filterValue);
      });
    })
  }

  public resetTempData(): void {
    this.tempCategories = this.cloneCategories(this._categories);
  }
}
