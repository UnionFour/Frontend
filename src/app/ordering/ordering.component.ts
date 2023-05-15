import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Order } from "../../assets/classes/order";
import {OrderingService} from "../services/ordering.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.css', '../../assets/styles/shady-input.css']
})
export class OrderingComponent {

  isDeliverySelected: boolean = true;
  order: Order;

  constructor(private orderingService: OrderingService, private router: Router) {
    this.order = orderingService.order!;
  }

  phoneFormGroup : FormGroup = new FormGroup({
    "phone": new FormControl()
  });
  promoCodeFormGroup: FormGroup = new FormGroup({
    "promoCode": new FormControl(
      "",
      [Validators.required, Validators.minLength(3)]
    )
    }
  );

  changeDeliveryMethod() {
    this.isDeliverySelected = !this.isDeliverySelected;
  }

  closeModal() {
    this.router.navigateByUrl('').then();
  }
}
