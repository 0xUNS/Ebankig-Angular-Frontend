import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';
import { AccountDetails } from '../model/accounts.model';
import { AccountsService } from '../services/accounts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent {
  currentPage: number = 0;
  pageSize: number = 5;
  accountObservable!: Observable<AccountDetails>;
  operationFromGroup!: FormGroup;
  errorMessage!: string;
  accountId: string = this.route.snapshot.params['id'];

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService, private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAccounts();
    this.operationFromGroup = this.fb.group({
      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null),
    });
  }

  getAccounts() {
    this.accountObservable = this.accountsService
      .getAccountById(this.accountId, this.currentPage, this.pageSize)
      .pipe(
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

  handleAccountOperation() {
    let operationType = this.operationFromGroup.value.operationType;
    let amount: number = this.operationFromGroup.value.amount;
    let description: string = this.operationFromGroup.value.description;
    let accountDestination: string =
      this.operationFromGroup.value.accountDestination;
    if (operationType == 'DEBIT') {
      this.accountsService.debit(this.accountId, amount, description).subscribe({
        next: () => {
          alert('Success Credit');
          this.operationFromGroup.reset();
          this.getAccounts();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (operationType == 'CREDIT') {
      this.accountsService.credit(this.accountId, amount, description).subscribe({
        next: () => {
          alert('Success Debit');
          this.operationFromGroup.reset();
          this.getAccounts();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (operationType == 'TRANSFER') {
      this.accountsService
        .transfer(this.accountId, accountDestination, amount, description)
        .subscribe({
          next: () => {
            alert('Success Transfer');
            this.operationFromGroup.reset();
            this.getAccounts();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
