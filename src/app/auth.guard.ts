import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable, Injector} from "@angular/core";
import {AuthService} from "./services/auth/auth.service";
import {TuiDialogService} from "@taiga-ui/core";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {LoginComponent} from "./login/login.component";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private readonly loginDialog = this.dialogs.open<boolean>(
    new PolymorpheusComponent(LoginComponent, this.injector)
  );

  constructor(private authService: AuthService,
              private router: Router,
              private dialogs: TuiDialogService,
              private readonly injector: Injector) {}

  login(): void {
    this.loginDialog.subscribe();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!window.localStorage["jwt"]) {
      this.router.navigateByUrl('').then();
      this.login();
      return this.loginDialog;
    }
    return of(true);
  }
}
