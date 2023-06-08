import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable, Injector} from "@angular/core";
import {AuthService} from "./core/services/auth.service";
import {TuiDialogService} from "@taiga-ui/core";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {LoginComponent} from "./core/login/login.component";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private readonly loginDialog = this.dialogs.open<boolean>(
    new PolymorpheusComponent(LoginComponent, this.injector)
  );

  constructor(private authService: AuthService,
              private dialogs: TuiDialogService,
              private readonly injector: Injector,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (window.localStorage.getItem("jwt"))
      return true;

    this.router.navigateByUrl("");

    this.loginDialog.subscribe(
      value => {
        if (value)
          this.router.navigateByUrl(next.url[0].path);
      });

    return false;
  }
}
