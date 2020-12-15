import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from '../../shared/models/order';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {
  order: IOrder;
  constructor(private router: Router) {
    const navigtion = this.router.getCurrentNavigation();
    const state = navigtion && navigtion.extras && navigtion.extras.state;
    if (state) {
      this.order = state as IOrder;
    } 
  }

  ngOnInit() {
  }

}
