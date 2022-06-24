import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddQuoteComponent } from './add-quote/add-quote.component';
import { AuthComponent } from './auth/auth.component';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';
import { QuotesComponent } from './quotes/quotes.component';

const routes: Routes = [
  { path: '', redirectTo: 'quotes', pathMatch: 'full' },
  { path: 'quotes', component: QuotesComponent },
  { path: 'sign-in', component: AuthComponent },
  { path: 'my-quotes', component: MyQuotesComponent },
  { path: 'add-quote', component: AddQuoteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
