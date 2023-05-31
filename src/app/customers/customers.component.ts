import { Component, OnInit } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CustomersService } from '../services/customers.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from '../model/customer.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers!:Observable<Array<Customer>>
  errorMessage!:object
  searchformGroup:FormGroup | undefined

  constructor(private customerService:CustomersService, private fb:FormBuilder) { }
  ngOnInit() {
    this.searchformGroup = this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleSearchCustomers()
  }

  handleSearchCustomers() {
    let s = this.searchformGroup?.value.keyword
    this.customers = this.customerService.searchCustomers(s).pipe(
      catchError(err => {
        this.errorMessage = err.message
        return throwError(err);
      })
    );
    console.log(this.customers);
  }
}
