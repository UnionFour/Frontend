import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.css', '../../assets/styles/shady-input.css']
})
export class OrderingComponent {

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
