import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts-details/accounts.component';
import { CustomerNewComponent } from './customer-new/customer-new.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomersComponent,
    AccountsComponent,
    CustomerNewComponent,
    CustomerAccountsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
