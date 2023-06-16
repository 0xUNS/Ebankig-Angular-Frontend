import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts-details/accounts.component';
import { CustomerNewComponent } from './customer-new/customer-new.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "customers", component: CustomersComponent},
  {path: "new-customer", component: CustomerNewComponent},
  {path: "customers/:id", component: CustomerAccountsComponent},
  {path: "accounts/:id", component: AccountsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
