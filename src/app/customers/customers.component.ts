import { Component, OnInit } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CustomersService } from '../services/customers.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from '../model/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers!:Observable<Array<Customer>>
  errorMessage!:object
  searchformGroup!:FormGroup

  constructor(private customerService: CustomersService, private fb: FormBuilder, private router: Router) { }
  ngOnInit() {
    this.searchformGroup = this.fb.group({
      keyword : this.fb.control("")
    })
    this.handleSearchCustomers()
  }

  handleSearchCustomers() {
    let s = this.searchformGroup?.value.keyword
    this.customers = this.customerService.searchCustomers(s).pipe(
      catchError(err => {
        this.errorMessage = err.message
        return throwError(err)
      })
    )
    console.log(this.customers)
  }
  
  handleDeleteCustomer(customer: Customer) {
    let conf = confirm("Are you sure?");
    if (!conf) return;
    this.customerService.deleteCustomer(customer.id).subscribe({
      next: () => this.customers=this.customers.pipe(
          map (data => {
            let index = data.indexOf(customer);
            data.slice(index, 1)
            return data;
          })
      ), error: err => console.log(err)
    })
  }

  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl("/customer-accounts/" + customer.id)
  }
}
