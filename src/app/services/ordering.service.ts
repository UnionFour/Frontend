import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Order } from 'src/assets/classes/order'
import {Product} from "../../assets/classes/product";

@Injectable({
  providedIn: 'root',
})

export class OrderingService {
  order$: Subject<Order> = new Subject<Order>;

  initializeOrder(order: Order) {
    this.order$.next(order);
  }
}
