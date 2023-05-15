import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Order } from "../../assets/classes/order";
import {OrderingService} from "../services/ordering.service";
import {Router} from "@angular/router";

class PaymentMethod{
  name: string;
  isSelected: boolean;

  constructor(name: string, isSelected: boolean) {
    this.name = name;
    this.isSelected = isSelected;
  }
}

class PaymentMethods{
  paymentMethods: PaymentMethod[] = [];

  constructor(...methods: PaymentMethod[]) {
    this.paymentMethods = methods;
  }

  chooseMethod(methodName: string){
    this.paymentMethods.forEach((method: PaymentMethod) => {
      method.isSelected = method.name === methodName;
    });
  }

  getIsSelected(methodName: string): boolean {
    for (let i = 0; i < this.paymentMethods.length; i++) {
      if (this.paymentMethods[i].name == methodName) {
        return this.paymentMethods[i].isSelected;
      }
    }
    return false;
  }
}

@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.css', '../../assets/styles/shady-input.css']
})
export class OrderingComponent {

  paymentMethods: PaymentMethods = new PaymentMethods(
    new PaymentMethod('cash', true),
    new PaymentMethod('bankCard', false),
    new PaymentMethod('sberPay', false)
  );
  isDeliverySelected: boolean = true;
  order: Order;
  phone: string;

  constructor(private orderingService: OrderingService, private router: Router) {
    this.order = orderingService.order!;
    this.phone = window.localStorage['phone'];
  }

  promoCodeFormGroup: FormGroup = new FormGroup({
    "promoCode": new FormControl(
      "",
      [Validators.required, Validators.minLength(3)]
    )
    }
  );

  addressFormGroup: FormGroup = new FormGroup({
    "street": new FormControl(
      "",
      [Validators.required, Validators.minLength(3)]
    ),
    "houseNumber": new FormControl(
      "",
      [Validators.required, Validators.minLength(1)]
    ),
    "entrance": new FormControl(),
    "apartment": new FormControl(),
    "floor": new FormControl(),
    "doorCode": new FormControl()
    }
  );

  changePaymentMethod(event: Event) {
    let target = event.target as HTMLInputElement;
    this.paymentMethods.chooseMethod(target.id);
  }

  changeDeliveryMethod() {
    this.isDeliverySelected = !this.isDeliverySelected;
  }

  closeModal() {
    this.router.navigateByUrl('').then();
  }
}
