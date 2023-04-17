import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}
  availablePages: string[] = ['', '/account'];

  setListTo(address: string = '') {
    if (address in this.availablePages) {
      this.router.navigateByUrl(address).then(r => {return;});
      return;
    }
  }
}
