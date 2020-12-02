import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketitem, IBasketTotals } from '../shared/models/basket';
import { IProduct } from '../shared/models/products';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiURL;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + `basket?id=${id}`)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          this.calculateTotal();
        })
      );
  }

  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe(
      (response: IBasket) => {
        this.basketSource.next(response);
        this.calculateTotal();
      }, error => {
        console.log(error);
      });
  }

  getCurrentBasketValue(): IBasket {
    return this.basketSource.value;

  }

  addItemtoBasket(item: IProduct, quantity = 1): void {
    const itemtoAdd: IBasketitem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addorUpdateItems(basket.items, itemtoAdd, quantity);
    this.setBasket(basket);

  }

  incrementItemQuanity(item: IBasketitem): void {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketitem): void {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removefromBasket(item);
    }

  }
  removefromBasket(item: IBasketitem): void {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x => x.id === item.id)) {
      basket.items = basket.items.filter(i => i.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }
  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + `basket?id=${basket.id}`).subscribe(() => {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    });
  }

  private calculateTotal(): void {
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    return this.basketTotalSource.next({ shipping, total, subtotal });
  }

  private addorUpdateItems(items: IBasketitem[], itemtoAdd: IBasketitem, quantity: number): IBasketitem[] {
    const index = items.findIndex(i => i.id === itemtoAdd.id);
    if (index === -1) {
      itemtoAdd.quantity = quantity;
      items.push(itemtoAdd);
    } else {
      items[index].quantity += quantity;

    }
    return items;
  }
  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketitem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType
    };
  }
}
