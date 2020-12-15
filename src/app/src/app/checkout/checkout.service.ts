import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDeliveryMethods } from '../shared/models/deliverymethods';
import { IOrder, IOrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiURL;

  constructor(private http: HttpClient,) { }

  getDeliveryMethods() {
    return this.http.get(this.baseUrl + 'order/deliveryMethods').pipe(
      map((dm: IDeliveryMethods[]) => {
        return dm.sort((a, b) => b.price - a.price);
      })
    );
  }

  createOrder(order: IOrderToCreate) {
    return this.http.post(this.baseUrl + 'order', order);
  }
}
