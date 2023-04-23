import { Component, OnInit } from '@angular/core';
import {OrderingService} from "./services/ordering.service";
import { Order } from "../assets/classes/order";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  order: Order | undefined;
  isOpenModal: boolean = false;
  constructor(private orderingService: OrderingService) { }

  ngOnInit() {
    this.orderingService.order$.subscribe(
      (newOrder) => {
        this.order = newOrder;
        this.isOpenModal = true;
      }
    );
  }
}
