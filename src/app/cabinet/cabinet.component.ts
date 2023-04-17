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
        Validators.pattern('\'/^(?=.{1,40}$)[а-яёА-ЯЁ]+(?:[-\' ][а-яёА-ЯЁ]+)*$/\'')
      ]),
  });

  emailForm : FormGroup = new FormGroup({
    "userEmail": new FormControl(
      "",
      [
        Validators.email
      ]
    ),
  });

  birthdayForm : FormGroup = new FormGroup({
    "userBirthday": new FormControl()
  });
}
