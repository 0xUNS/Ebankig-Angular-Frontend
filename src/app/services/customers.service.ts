import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Customer } from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private url:string = "http://ip172-18-0-23-chrrlvoedtg000cvvkf0-8080.direct.labs.play-with-docker.com" ;

  constructor(private http:HttpClient) { }

  public getCustomers():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.url + "/customers")
  }

  public searchCustomers(keyword:string):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.url + "/customers")
  }
}
