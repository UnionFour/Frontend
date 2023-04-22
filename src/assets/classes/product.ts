export class Product {
  name: string;
  description: string;
  category: string;
  imgPath: string;
  price: number;

  constructor(name: string, description: string, category: string, price: number,
              imgPath: string = "assets/img/pizza_example.png") {
    this.name = name;
    this.description = description;
    this.category = category;
    this.imgPath = imgPath;
    this.price = price;
  }

  getShortDescription(maxLength: number, endSymbols: string = '...') {
    if (this.description.length > maxLength) {
      return this.description.slice(0, maxLength - (endSymbols.length + 1)) + endSymbols;
    }
    return this.description;
  }

  getShortName(maxLength: number, endSymbols: string = '...') {
    if (this.name.length > maxLength) {
      return this.name.slice(0, maxLength - (endSymbols.length + 1)) + endSymbols;
    }
    return this.name;
  }
}
