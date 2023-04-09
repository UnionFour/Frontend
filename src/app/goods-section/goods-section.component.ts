import { Component } from '@angular/core';

@Component({
  selector: 'app-goods-section',
  templateUrl: './goods-section.component.html',
  styleUrls: ['./goods-section.component.css']
})
export class GoodsSectionComponent {
  readonly sectionName = 'Пицца';
  readonly goods = [
    { imgSrc: 'assets/img/pizza_picture1.png',
      name: 'Пицца-сказка с игрушкой на коробке',
      description: 'Пикантная пепперони, цыпленок, смесь сыров чеддер и пармезан, моцарелла, фирменный соус альфредо',
      price: '389 ₽' },
    { imgSrc: 'assets/img/pizza_picture1.png',
      name: 'Пицца-сказка с игрушкой на коробке',
      description: 'Пикантная пепперони, цыпленок, смесь сыров чеддер и пармезан, моцарелла, фирменный соус альфредо',
      price: '1389 ₽' },
    { imgSrc: 'assets/img/pizza_picture1.png',
      name: 'Пицца-сказка с игрушкой на коробке',
      description: 'Пикантная пепперони, цыпленок, смесь сыров чеддер и пармезан, моцарелла, фирменный соус альфредо',
      price: '1389 ₽' },
    { imgSrc: 'assets/img/pizza_picture1.png',
      name: 'Пицца-сказка с игрушкой на коробке',
      description: 'Пикантная пепперони, цыпленок, смесь сыров чеддер и пармезан, моцарелла, фирменный соус альфредо',
      price: '1389 ₽' },
    { imgSrc: 'assets/img/pizza_picture1.png',
      name: 'Пицца-сказка с игрушкой на коробке',
      description: 'Пикантная пепперони, цыпленок, смесь сыров чеддер и пармезан, моцарелла, фирменный соус альфредо',
      price: '1389 ₽' },
    { imgSrc: 'assets/img/pizza_picture1.png',
      name: 'Пицца-сказка с игрушкой на коробке',
      description: 'Пикантная пепперони, цыпленок, смесь сыров чеддер и пармезан, моцарелла, фирменный соус альфредо',
      price: '1389 ₽' },
    ];
}
