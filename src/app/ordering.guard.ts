import {Injectable, Injector} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {OrderingService} from "./services/ordering.service";
import {Observable, of} from "rxjs";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {LoginComponent} from "./login/login.component";
import {AuthService} from "./services/auth/auth.service";
import {TuiDialogService} from "@taiga-ui/core";

@Injectable({
  providedIn: 'root'
})
export class OrderingGuard implements CanActivate {

  private readonly loginDialog = this.dialogs.open<boolean>(
    new PolymorpheusComponent(LoginComponent, this.injector)
  );

  constructor(private authService: AuthService,
              private orderingService: OrderingService,
              private dialogs: TuiDialogService,
              private readonly injector: Injector,
              private router: Router) {
  }

  login(): void {
    this.loginDialog.subscribe();
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.orderingService.order) {
      this.router.navigateByUrl('').then();
      return of(false);
    }
    return of(true);
  }
}
