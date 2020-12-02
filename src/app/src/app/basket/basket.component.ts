import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketitem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$: Observable<IBasket>;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  removebasketItem(item: IBasketitem): void {
    this.basketService.removefromBasket(item);
  }

  incrementItemQuanity(item: IBasketitem): void {
    this.basketService.incrementItemQuanity(item);
  }

  decrementItemQuantity(item: IBasketitem): void {
    this.basketService.decrementItemQuantity(item);
  }


}
