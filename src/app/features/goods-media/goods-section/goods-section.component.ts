import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../core/models/product';
import {LoadingProductsService} from "../../../core/services/loading-products.service";

@Component({
  selector: 'app-goods-section',
  templateUrl: './goods-section.component.html',
  styleUrls: ['./goods-section.component.css']
})
export class GoodsSectionComponent {
  @Input() public sectionName!: string;
  @Input() public products!: Product[];

  constructor() {
  }
}
