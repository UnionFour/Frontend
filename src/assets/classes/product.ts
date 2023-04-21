export class Product {
  name: string;
  description: string;
  category: string;
  imgPath: string;
  price: number;

  constructor(name: string, description: string, category: string, price: number) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.imgPath = "assets/img/pizza_picture1.png";
    this.price = price;
  }
}
