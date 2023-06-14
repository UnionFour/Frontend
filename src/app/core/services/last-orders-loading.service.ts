import { Injectable } from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class LastOrdersLoadingService {
  public lastProducts$: Subject<
    {
      productId: string,
      name: string,
      price: number,
      picture: string
    }[]> = new Subject();
  public sub: Subscription | undefined;

  constructor(private readonly _apollo: Apollo) {
    // TODO: заменить на айди юзера из локального стораджа
    let userId: string = 'c830d378-96dd-499b-96d9-47cd2e46709a';
    this.loadLastProducts(userId);
  }

  public loadLastProducts(input: any): void {
    this.sub = this._apollo
      .watchQuery<any>({
        query: gql`
        query GetLastProducts($input: UUID!) {
          userLastOrder(userId: $input) {
            productId,
            name,
            price,
            picture
          }
        }
      `,
      variables: {input}
    }).valueChanges.subscribe(({data, loading}): void => {
      this.lastProducts$.next(data.userLastOrder);
    });
  }
}
