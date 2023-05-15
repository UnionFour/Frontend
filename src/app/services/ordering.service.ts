import { Injectable } from '@angular/core';
import { Order } from 'src/assets/classes/order'

@Injectable({
  providedIn: 'root',
})

export class OrderingService {
  order: Order | undefined;

  initializeOrder(order: Order) {
    this.order = order;
  }
}
