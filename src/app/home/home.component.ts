import { Component, OnInit } from '@angular/core';
import { OrderingService } from "../services/ordering.service";
import { Order } from "../../assets/classes/order";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {

  order: Order | undefined;
  isOpenModal: boolean = false;
  constructor(private orderingService: OrderingService) { }

  ngOnInit() {
    this.orderingService.order$.subscribe(
      (newOrder) => {
        this.order = newOrder;
        this.changeOpennessModal(true);
      }
    );
  }

  changeOpennessModal(isOpen: boolean) {
    this.isOpenModal = isOpen;
  }
}
