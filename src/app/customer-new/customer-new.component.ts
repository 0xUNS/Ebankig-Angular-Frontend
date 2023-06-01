import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../services/customers.service';
import { Router } from '@angular/router';
import { Customer } from '../model/customer.model';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.css']
})
export class CustomerNewComponent implements OnInit {
  newCustomerFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private customerService: CustomersService, private router: Router) { }

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(2)]),
      email: this.fb.control(null, [Validators.required, Validators.email])
    })
  }

  handleSaveCustomer() {
    let customer:Customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next: data => {
        alert("Customer has been successfully saved!")
        //this.newCustomerFormGroup.reset()
        this.router.navigateByUrl("/customers")
      }, error: err => console.log(err)
    })
  }
}
