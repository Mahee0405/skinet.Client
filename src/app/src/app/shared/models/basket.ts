import { v4 as uuid4 } from 'uuid';

export interface IBasketitem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export interface IBasket {
    id: string;
    items: IBasketitem[];
}

export class Basket implements IBasket {
    id = uuid4();
    items: IBasketitem[] = [];

}

export interface IBasketTotals {
    shipping: number;
    subtotal: number;
    total: number;
}
