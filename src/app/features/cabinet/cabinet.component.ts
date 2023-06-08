import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TuiDay } from '@taiga-ui/cdk';
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css', '../../../assets/styles/shady-input.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CabinetComponent {

  phone: string;

  constructor(private authService: AuthService, private router: Router) {
    this.phone = window.localStorage['phone'];
  }

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

  signOut() {
    this.authService.SignOut();
    this.router.navigateByUrl('').then();
  }
}
