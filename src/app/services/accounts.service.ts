import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountDetails } from '../model/accounts.model';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { CustomerAccounts } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http : HttpClient) { }

  public getAccounts():Observable<Array<CustomerAccounts>>{
    return this.http.get<Array<CustomerAccounts>>(environment.backendHost+"/accounts");
  }
  public getCustomerAccounts(accountId : string, page : number, size : number):Observable<CustomerAccounts>{
    return this.http.get<CustomerAccounts>(environment.backendHost+"/customer-accounts/"+accountId+"?page="+page);
   }
  public getAccountById(accountId : string, page : number, size : number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backendHost+"/accounts/"+accountId+"/pageOperations?page="+page);
  }
  public debit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.backendHost+"/accounts/debit",data);
  }
  public credit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.backendHost+"/accounts/credit",data);
  }
  public transfer(accountSource: string,accountDestination: string, amount : number, description:string){
    let data={accountSource, accountDestination, amount, description }
    return this.http.post(environment.backendHost+"/accounts/transfer",data);
  }
}
