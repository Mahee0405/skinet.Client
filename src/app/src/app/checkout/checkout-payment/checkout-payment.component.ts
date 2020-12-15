import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';
import { IBasket } from '../../shared/models/basket';
import { IOrder } from '../../shared/models/order';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(private basketService: BasketService, private checkoutService: CheckoutService,
    private toastrService: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.orderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe((order: IOrder) => {
      this.toastrService.success('Order created sucessfully');
      this.basketService.deleteLocalBasket(basket.id);
      const navigationExtras: NavigationExtras = { state: order };
      this.router.navigate(['checkout/success'], navigationExtras);
    }, error => {
      this.toastrService.error(error.message);
    })
  }
  private orderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: + this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress: this.checkoutForm.get('addressForm').value
    };
  }

}
