import { Component } from '@angular/core';
import { Customer } from '../model/customer.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent {
  customerId! : string
  customer! : Customer
  
  constructor(private route : ActivatedRoute) {

  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id']
  }
}
