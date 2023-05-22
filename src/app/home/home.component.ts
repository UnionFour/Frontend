import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuthorized!: boolean;

  constructor(private readonly authService: AuthService) {
    this.isAuthorized = this.authService.isAuthorized;
  }

  ngOnInit() {
    this.authService.authorization$.subscribe((authValue) => {
      this.isAuthorized = authValue;
    });
  }

}
