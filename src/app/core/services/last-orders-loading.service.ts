import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Product } from '../models/product';
import { Ingredient } from '../models/ingredient';

@Injectable({
    providedIn: 'root',
})
export class LastOrdersLoadingService {
    public lastProducts$: Subject<Product[]> = new Subject();
    public sub: Subscription | undefined;

    constructor(private readonly _apollo: Apollo) {
        let userId: string = window.localStorage['userId'];
        this.loadLastProducts(userId);
    }

    public loadLastProducts(input: any): void {
        this.sub = this._apollo
            .watchQuery<any>({
                query: gql`
        query GetLastProducts($input: UUID!) {
          userLastOrder(userId: $input) {
            name
            description
            picture
            price
            category
            productId
            ingredients {
              name
            }
          }
        }
      `,
                variables: {input}
            }).valueChanges.subscribe(({data, loading}): void => {
                this.lastProducts$.next(data.userLastOrder.map((product: any) => {
                    return new Product(
                        product.productId,
                        product.name,
                        product.description,
                        product.category,
                        product.price,
                        product.picture,
                        product.ingredients.map((ingredient: Ingredient) => {
                            return new Ingredient(ingredient.name);
                        })
                    );
                }));
            });
    }
}
