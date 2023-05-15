import {Component, Inject, Injector, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../services/auth/auth.service";
import {AuthPayload} from "../../gql/graphql";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT, PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../cabinet/cabinet.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public phone: FormControl = new FormControl<string>("+7", Validators.minLength(12));

  public code: FormControl = new FormControl<number | null>(null,
    [Validators.pattern("^[0-9]{6}"), Validators.required]);
  public codeSubscription: Subscription = new Subscription();
  public smsCodeSent: boolean = false;

  private encryptedCode: string = "";

  constructor(private authService: AuthService,
              @Inject(POLYMORPHEUS_CONTEXT)
              private readonly context: TuiDialogContext<boolean>,
              private router: Router) {
  }

  ngOnInit() {
    this.codeSubscription = this.code.valueChanges.subscribe(() => {
      if (this.code.valid) {
        this.authService.GetAccessToken({
          encryptedCode: this.encryptedCode,
          phone: this.phone.value,
          smsCode: this.code.value
        }).subscribe((jwt: string) => {
          window.localStorage["jwt"] = jwt;
          this.context.completeWith(true);
        });
      }
    })
  }

  ngOnDestroy() {
    this.codeSubscription.unsubscribe();
  }

  public sendSmsCode(): void {
    if (this.phone.valid) {
      this.authService.SendSmsCode(this.phone.value).subscribe((authPayload: AuthPayload): void => {
        this.smsCodeSent = true;
        this.encryptedCode = authPayload.encryptedCode;
      });

      return;
    }
  }
}
