import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CustomerNewComponent } from './customer-new/customer-new.component';

const routes: Routes = [
  {path: "customers", component: CustomersComponent},
  {path: "new-customer", component: CustomerNewComponent},
  {path: "accounts", component: AccountsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
