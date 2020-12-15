import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from '../../basket/basket.service';
import { IDeliveryMethods } from '../../shared/models/deliverymethods';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {

  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethods[];

  constructor(private checkoutService: CheckoutService, private basketService: BasketService) { }

  ngOnInit() {
    this.checkoutService.getDeliveryMethods().subscribe(
      (dm: IDeliveryMethods[]) => {
        this.deliveryMethods = dm;
      }, error => {
        console.log(error);
      })
  }

  setShippingPrice(deliveryMethods: IDeliveryMethods) {
    this.basketService.setShippingPrice(deliveryMethods);
  }

}
