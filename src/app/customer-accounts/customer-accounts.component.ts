import { Component, OnInit } from '@angular/core';
import { Customer, CustomerAccounts } from '../model/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../services/accounts.service';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css'],
})
export class CustomerAccountsComponent implements OnInit {
  customerId: string = this.route.snapshot.params['id'];
  customer!: Customer;
  customerAccounts!: Observable<CustomerAccounts>;
  currentPage: number = 0;
  pageSize: number = 5;
  errorMessage!: string;

  constructor(
    private accountsService: AccountsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.customerAccounts = this.accountsService.getCustomerAccounts(this.customerId, this.currentPage, this.pageSize).pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.getAccounts();
  }
}
