import {Ingredient} from './ingredient';

export class Product {
  public productId: string;
  public name: string;
  public description: string;
  public picture: string;
  public category: string;
  public price: number;
  public ingredients: Ingredient[];

  constructor(productId: string = '0', name: string = '', description: string = '', category: string = '',
              price: number = 300, imgPath: string = "assets/img/pizza_example.png", ingredients: Ingredient[] = []) {
    this.productId = productId;
    this.name = name;
    this.description = description;
    this.category = category;
    this.picture = imgPath;
    this.price = price;
    this.ingredients = ingredients;
  }

  getShortDescription(maxLength: number, endSymbols: string = '...'): string {
    if (this.description.length > maxLength) {
      return this.description.slice(0, maxLength - (endSymbols.length + 1)) + endSymbols;
    }
    return this.description;
  }

  getShortName(maxLength: number, endSymbols: string = '...'): string {
    if (this.name.length > maxLength) {
      return this.name.slice(0, maxLength - (endSymbols.length + 1)) + endSymbols;
    }
    return this.name;
  }
}
