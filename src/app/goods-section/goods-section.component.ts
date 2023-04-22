import { Component } from '@angular/core';
import { Product } from "../../assets/classes/product";

@Component({
  selector: 'app-goods-section',
  templateUrl: './goods-section.component.html',
  styleUrls: ['./goods-section.component.css']
})
export class GoodsSectionComponent {
  readonly sectionName = 'Пицца';
  readonly products = Array<Product>(
    new Product(
      'Карбонара',
      'Бекон, сыры чеддер и пармезан, моцарелла, томаты, красный лук, чеснок, фирменный соус альфредо, итальянские травы',
      'pizza',
      325,
      "assets/img/pizza_carbonara.png"),
    new Product(
      'Сырная',
      'Моцарелла, сыры чеддер и пармезан, фирменный соус альфредо',
      'pizza',
      289,
      "assets/img/pizza_cheesy.png"),
    new Product(
      'Ветчина и грибы',
      'Ветчина, шампиньоны, увеличенная порция моцареллы, фирменный томатный соус',
      'pizza',
      369,
      "assets/img/pizza_ham_and_mushrooms.png"),
    new Product(
      'Пепперони',
      'Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус',
      'pizza',
      299,
      "assets/img/pizza_pepperoni.png"),
    new Product(
      '4 сезона',
      'Увеличенная порция моцареллы, ветчина, пикантная пепперони, кубики брынзы, томаты, шампиньоны, итальянские травы, фирменный томатный соус',
      'pizza',
      419,
      "assets/img/pizza4_seasons.png"),
  )
}
