import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddQuoteComponent } from './add-quote/add-quote.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { EditQuoteComponent } from './edit-quote/edit-quote.component';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';
import { QuoteDetailsComponent } from './quotes/quote-details/quote-details.component';
import { QuotesComponent } from './quotes/quotes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'quotes',
    pathMatch: 'full',
  },
  {
    path: 'quotes/:quoteId/details',
    component: QuoteDetailsComponent,
  },
  {
    path: 'quotes/add',
    component: AddQuoteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'quotes',
    component: QuotesComponent,
  },

  { path: 'sign-in', component: AuthComponent },
  { path: 'my-quotes', component: MyQuotesComponent, canActivate: [AuthGuard] },
  {
    path: 'my-quotes/:quoteId/edit',
    component: EditQuoteComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
