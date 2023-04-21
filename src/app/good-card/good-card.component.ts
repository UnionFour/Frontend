import { Input, Component } from '@angular/core';
import { SelectingProductsService } from "../services/selecting-products";
import { Product } from "../../assets/classes/product";

@Component({
  selector: 'good-card',
  templateUrl: './good-card.component.html',
  styleUrls: ['./good-card.component.css']
})
export class GoodCardComponent {
  constructor(private selectingProductsService: SelectingProductsService) {}

  @Input()
  product!: Product;

  postponeGood() {
    this.selectingProductsService.addSelectedProduct(this.product);
  }
}
