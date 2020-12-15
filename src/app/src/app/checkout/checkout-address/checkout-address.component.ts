import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(private accountService: AccountService, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  saveUserAddress() {
    this.accountService.updateUserAddress(this.checkoutForm.get('addressForm').value).subscribe(() => {
      this.toastrService.success('Addrss Saved');
    }, error => {
      console.log(error);
     
    });
  }

}
