import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Order } from "../../assets/classes/order";

@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.css', '../../assets/styles/shady-input.css']
})
export class OrderingComponent {

  @Input() order!: Order;

  isDeliverySelected: boolean = true;

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
}
