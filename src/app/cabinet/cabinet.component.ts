import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent {
  nameForm : FormGroup = new FormGroup({
    "userName": new FormControl(
      "",
      [
        Validators.required,
      ]),
  });

  emailForm : FormGroup = new FormGroup({
    "userEmail": new FormControl(
      "",
      [
        Validators.email,
        Validators.required,
      ]
    ),
  });

  birthdayForm : FormGroup = new FormGroup({
    "userBirthday": new FormControl(
      "",
      [
        Validators.required,
      ]
    )
  });
}
