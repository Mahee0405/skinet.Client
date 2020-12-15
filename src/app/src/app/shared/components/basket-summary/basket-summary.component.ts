import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs';
import { BasketService } from '../../../basket/basket.service';
import { IBasket, IBasketitem } from '../../models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {

  basket$: Observable<IBasket>;
  @Output() decrement: EventEmitter<IBasketitem> = new EventEmitter<IBasketitem>();
  @Output() increment: EventEmitter<IBasketitem> = new EventEmitter<IBasketitem>();
  @Output() remove: EventEmitter<IBasketitem> = new EventEmitter<IBasketitem>();
  @Input() isBasket = true;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
  }

  decrementItemQuantity(item: IBasketitem) {
    this.decrement.emit(item);
  }

  incrementItemQuanity(item: IBasketitem) {
    this.increment.emit(item);
  }

  removebasketItem(item: IBasketitem) {
    this.remove.emit(item);
  }

}
