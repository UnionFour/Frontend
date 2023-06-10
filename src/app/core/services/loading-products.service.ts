import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular'
import {Subject, Subscription} from 'rxjs';
import {Product} from '../models/product';
import {Ingredient} from "../models/ingredient";
import {ProductCategory} from "../models/product-category";

@Injectable({
  providedIn: 'root'
})
export class LoadingProductsService {
  public loading: boolean | undefined;
  public products: Product[] | undefined;
  public sub: Subscription | undefined;
  public loadedCategories$: Subject<ProductCategory[]> = new Subject<ProductCategory[]>();
  public productCategories: ProductCategory[] = [];

  constructor(private readonly _apollo: Apollo) {
    this.getProducts();
  }

  public getProducts(): void {
    this.sub = this._apollo
      .watchQuery<any>({
        query: gql`
        query GetProducts {
          products {
            name
            description
            picture
            price
            category
            ingredients {
              name
            }
          }
        }
      `,
      })
      .valueChanges.subscribe(({data, loading}): void => {
        this.loading = loading;
        this.products = data.products;
        this.parseProducts();
        this.parseCategories();
      });
  }

  private parseProducts(): void {
    this.products = this.products!.map((product: Product) => {
      return new Product(
        product.name,
        product.description,
        product.category,
        product.price,
        product.picture,
        product.ingredients.map((ingredient: Ingredient) => {return new Ingredient(ingredient.name);})
      )
    })
  }

  private parseCategories(): void {
    let productDict: Map<string, Product[]> = new Map<string, Product[]>();
    for (let i: number = 0; i < this.products!.length; i++) {
      if (productDict.has(this.products![i].category)) {
        productDict.get(this.products![i].category)!.push(this.products![i]);
      } else {
        productDict.set(this.products![i].category, [this.products![i]]);
      }
    }
    productDict.forEach((value: Product[], key: string, map: Map<string, Product[]>): void => {
      this.productCategories!.push(new ProductCategory(key, value));
    });
    this.loadedCategories$.next(this.productCategories!);
  }
}
