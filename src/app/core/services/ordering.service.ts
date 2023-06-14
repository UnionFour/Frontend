import { Injectable } from '@angular/core';
import { UserOrder } from 'src/app/core/models/user-order'
import {Apollo, gql} from 'apollo-angular';
import {Order, OrderDtoInput, OrderExtradition, ProductDtoInput} from '../../../gql/graphql';
import {DelayedProduct} from "../models/delayed-product";
import {Subject} from "rxjs";
import {MessagingService} from "./messaging.service";

@Injectable({
  providedIn: 'root',
})
export class OrderingService {
  order: UserOrder | undefined;
  public newOrder$: Subject<undefined> = new Subject<undefined>();

  constructor(private readonly _apollo: Apollo, private readonly _messagingService: MessagingService) {
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
      this.newOrder$.next(undefined);
      this._messagingService.sendModalMessage("Ваш заказ оформлен", 5000);
    });
  }
}
