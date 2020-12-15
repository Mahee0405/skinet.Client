import { Component, OnInit } from '@angular/core';
import { AccountService } from './src/app/account/account.service';
import { BasketService } from './src/app/basket/basket.service';
import { IBasket } from './src/app/shared/models/basket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'skinet';

  constructor(private basektService: BasketService, private accountService: AccountService) {

  }

  loadBasket(): void {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basektService.getBasket(basketId).subscribe(
        (response) => {
          console.log(response);
        }, error => {
          console.log(error);
        });
    }
  }

  loadCurrentUser(): void {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe(() => {
    }, error => {
      console.log(error);
    })

  }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadBasket();
  }
}
