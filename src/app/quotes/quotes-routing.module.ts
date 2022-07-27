import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard';
import { AddQuoteComponent } from './components/add-quote/add-quote.component';
import { EditQuoteComponent } from './components/edit-quote/edit-quote.component';
import { MyQuotesComponent } from './components/my-quotes/my-quotes.component';
import { QuoteDetailsComponent } from './components/quote-details/quote-details.component';

import { QuotesComponent } from './components/quotes/quotes.component';

const routes: Routes = [
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
  { path: 'my-quotes', component: MyQuotesComponent, canActivate: [AuthGuard] },
  {
    path: 'my-quotes/:quoteId/edit',
    component: EditQuoteComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotesRoutingModule {}
