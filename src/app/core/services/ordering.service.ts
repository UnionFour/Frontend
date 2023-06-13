import { Injectable } from '@angular/core';
import { Order } from 'src/app/core/models/order'
import {Apollo} from "apollo-angular";

@Injectable({
  providedIn: 'root',
})

export class OrderingService {
  order: Order | undefined;

  constructor(private readonly _apollo: Apollo) {
  }

  public initializeOrder(order: Order): void {
    this.order = order;
  }

  public sendOrder(): void {
    const userId = window.localStorage["userId"];
    // this._apollo.mutate()
  }
}
