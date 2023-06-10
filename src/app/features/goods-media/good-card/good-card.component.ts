import {Input, Component, OnInit} from '@angular/core';
import { SelectingProductsService } from "../../../core/services/selecting-products.service";
import { Product } from "../../../core/models/product";

@Component({
  selector: 'good-card',
  templateUrl: './good-card.component.html',
  styleUrls: ['./good-card.component.css']
})
export class GoodCardComponent {
  @Input() public product!: Product;

  constructor (private selectingProductsService: SelectingProductsService) {
  }

  postponeGood(): void {
    this.selectingProductsService.addSelectedProduct(this.product);
  }
}
