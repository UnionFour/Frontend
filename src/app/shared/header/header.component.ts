import {ChangeDetectionStrategy, Component, Injector} from '@angular/core';
import {TuiDialogService} from "@taiga-ui/core";
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {LoginComponent} from "../../core/login/login.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private readonly loginDialog = this.dialogs.open(
    new PolymorpheusComponent(LoginComponent, this.injector)
  );

  constructor(private dialogs: TuiDialogService, private readonly injector: Injector) {
  }

  login(): void {
    this.loginDialog.subscribe();
  }
}
