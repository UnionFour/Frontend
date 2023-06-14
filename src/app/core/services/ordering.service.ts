import { Injectable } from '@angular/core';
import { UserOrder } from 'src/app/core/models/user-order'
import {Apollo, gql} from 'apollo-angular';
import {Order, OrderDtoInput, OrderExtradition, ProductDtoInput} from '../../../gql/graphql';
import {DelayedProduct} from "../models/delayed-product";

@Injectable({
  providedIn: 'root',
})
export class OrderingService {
  order: UserOrder | undefined;

  constructor(private readonly _apollo: Apollo) {
  }

  public initializeOrder(order: UserOrder): void {
    this.order = order;
  }

  public parseDtoProducts(): ProductDtoInput[] {
    let result: ProductDtoInput[] = [];
    this.order!.getProducts().forEach((product: DelayedProduct): void => {
      result.push({
        amount: product.amount,
        name: product.name,
        productId: product.productId
      });
    });
    return result;
  }

  public sendOrder(): void {
    let input: OrderDtoInput = {
      userid: window.localStorage["userId"],
      extradition: this.order!.extradition,
      products: this.parseDtoProducts(),
      address: this.order!.address,
      cost: this.order!.orderSum
    };
    console.log(JSON.stringify(input));
    this._apollo.mutate({
      mutation: gql`
        mutation CreateOrder($input: OrderDTOInput!) {
          createOrder(orderDto: $input) {
            userid
            extradition
            address
            cost
            products {
              productId
            }
          }
        }
      `,
      variables: {input}
    }).subscribe(({data}): void => {
      // TODO: убрать
      console.log(data);
    });
  }
}
