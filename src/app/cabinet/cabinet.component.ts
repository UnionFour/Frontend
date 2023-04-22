import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TuiDay } from '@taiga-ui/cdk';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
      new TuiDay(2000, 1, 1),
      [
        Validators.required,
      ]
    )
  });
}
