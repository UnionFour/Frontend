import {AfterViewInit, Component, DoCheck, Input, OnInit} from '@angular/core';
import {Product} from '../../../core/models/product';
import {LoadingProductsService} from "../../../core/services/loading-products.service";

@Component({
  selector: 'app-goods-section',
  templateUrl: './goods-section.component.html',
  styleUrls: ['./goods-section.component.css']
})
export class GoodsSectionComponent implements DoCheck {
  @Input() public sectionName!: string;
  @Input() public products!: Product[];
  @Input() public isEmpty: boolean = false;

  constructor() {
  }

  public ngDoCheck(): void {
    if (this.products.length === 0) {
      this.isEmpty = true;
    } else if (this.isEmpty && this.products.length > 0) {
      this.isEmpty = false;
    }
  }

}
