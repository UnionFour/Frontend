import { DelayedProduct } from './delayed-product';
import { OrderExtradition } from '../../../gql/graphql';

export class UserOrder {
    productNames: Map<string, DelayedProduct>;
    orderSum: number;
    extradition: OrderExtradition;
    address: string | null = null;
    createDate: string | null = null;
    promoCode: string | null = null;
    userid: string | null = null;

    constructor(product: DelayedProduct) {
        this.extradition = OrderExtradition.Delivery;
        this.productNames = new Map<string, DelayedProduct>();
        this.append(product);
        this.orderSum = this.getOrderSum();
    }

    public append(product: DelayedProduct): void {
        if (this.productNames.has(product.name)) {
            let changedProduct: DelayedProduct | undefined = this.productNames.get(product.name);
            changedProduct!.plusAmount(product.amount);
        } else {
            this.productNames.set(product.name, product);
        }
        this.orderSum = this.getOrderSum();
    }

    public getOrderSum(): number {
        let sum: number = 0;
        for (let product of this.productNames.values()) {
            sum += product.totalCost;
        }
        return sum;
    }

    public removeProduct(productName: string): void {
        if (this.productNames.has(productName)) {
            this.productNames.delete(productName);
        }
    }

    public getProducts(): DelayedProduct[] {
        let result: DelayedProduct[] = [];
        this.productNames.forEach((value: DelayedProduct, key: string, map: Map<string, DelayedProduct>): void => {
            result.push(value);
        });
        return result;
    }
}
