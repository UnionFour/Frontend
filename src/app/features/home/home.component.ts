import {Component, OnDestroy} from '@angular/core';
import {LoadingProductsService} from "../../core/services/loading-products.service";
import {Product} from "../../core/models/product";
import {ProductCategory} from "../../core/models/product-category";
import {Ingredient} from "../../core/models/ingredient";
import {filter, Subscription} from "rxjs";
import {FilterSortService} from "../../core/services/filter-sort.service";

@Component({
  selector: 'app-home-media',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy{
  public tempCategories: ProductCategory[] = [];
  private _categories: ProductCategory[] = [];
  private _subs: Subscription[] = [];
  private _activeFilters: string[] = [];
  private _activateSort: {isReverse: boolean, sortCriteria: string} | undefined;

  constructor(private readonly _loadingProductsService: LoadingProductsService,
              private readonly _filterSortService: FilterSortService) {
    this._subs.push(this._loadingProductsService.loadedCategories$
      .subscribe((categories: ProductCategory[]): void => {

        // убрать (клонирование)
        categories.forEach((category: ProductCategory): void => {
          categories.push(category);
        })

        this.tempCategories = this.cloneCategories(categories);
        this._categories = this.cloneCategories(categories);
        }
      )
    );
    this._subs.push(this._filterSortService.callingFilter$
      .subscribe((filterParams: {filterValue: string}): void => {
        this.ingredientFilterGoods(filterParams.filterValue);
        }
      )
    );
    this._subs.push(this._filterSortService.callingSort$
      .subscribe((sortParams: {isReverse: boolean, sortCriteria: string}): void => {
          this.sortGoods(sortParams.isReverse, sortParams.sortCriteria);
        }
      )
    );
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
    if (this._activateSort?.sortCriteria === sortCriteria && this._activateSort?.isReverse === isReverse) {
      this._activateSort = undefined;
      this.resetTempData();
    } else {
      this._activateSort = {isReverse: isReverse, sortCriteria: sortCriteria};
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
  }

  public ingredientFilterGoods(filterValue: string): void {
    if (this._activeFilters.includes(filterValue)) {
      this._activeFilters = this._activeFilters.filter((activeFilter: string): boolean => {
        return activeFilter !== filterValue;
      });
      this.resetTempData();
      const tempActiveFilters: string[] = this._activeFilters;
      this._activeFilters = [];
      tempActiveFilters.forEach((activeFilter: string): void => {this.ingredientFilterGoods(activeFilter);});
    } else {
      this.tempCategories.map((category: ProductCategory): void => {
        category.products = category.products.filter((value: Product): boolean => {
          return value.ingredients.map((ingredient: Ingredient): string => {
            return ingredient.name;
          }).includes(filterValue);
        });
      })
      this._activeFilters.push(filterValue);
    }
  }

  public resetTempData(): void {
    this.tempCategories = this.cloneCategories(this._categories);
  }

  public ngOnDestroy(): void {
    this._subs.forEach((sub: Subscription): void => {sub.unsubscribe();});
  }
}
