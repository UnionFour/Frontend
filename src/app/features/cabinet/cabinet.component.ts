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

  public phone: string;

  constructor(private authService: AuthService, private router: Router) {
    this.phone = window.localStorage['phone'];
  }

  nameForm : FormGroup = new FormGroup({
    "userName": new FormControl(
      window.localStorage["name"],
      [
        Validators.required,
      ]),
  });

  emailForm : FormGroup = new FormGroup({
    "userEmail": new FormControl(
      window.localStorage["email"],
      [
        Validators.email,
        Validators.required,
      ]
    ),
  });

  birthdayForm : FormGroup = new FormGroup({
    "userBirthday": new FormControl(
      this.parseBirthDate(window.localStorage["birthday"]),
      [
        Validators.required,
      ]
    )
  });

  public signOut(): void {
    this.authService.SignOut();
    this.router.navigateByUrl('').then();
  }

  public saveName(): void {
    window.localStorage["name"] = this.nameForm.get("userName")?.value;
  }

  public saveEmail(): void {
    window.localStorage["email"] = this.emailForm.get("userEmail")?.value;
  }

  public saveBirthday(): void {
    window.localStorage["birthday"] = this.birthdayForm.get("userBirthday")?.value;
  }

  public parseBirthDate(stringDate: string | undefined): TuiDay {
    if (!stringDate || stringDate.length !== 10) {
      return new TuiDay(2000, 1, 1);
    }
    const day: number = Number.parseInt(stringDate.slice(0, 2));
    const month: number = Number.parseInt(stringDate.slice(3, 5));
    const year: number = Number.parseInt(stringDate.slice(6, 10));
    return new TuiDay(year, month - 1, day);
  }
}
