export class Product {
  name: string;
  description: string;
  category: string;
  imgPath: string;
  price: number;
  shortDescription: string;

  constructor(name: string, description: string, category: string, price: number,
              imgPath: string = "assets/img/pizza_example.png") {
    this.name = name;
    this.description = description;
    this.category = category;
    this.imgPath = imgPath;
    this.price = price;
    this.shortDescription = description;
    if (description.length > 130) {
      this.shortDescription = description.slice(0, 126) + '...';
    }
  }
}
