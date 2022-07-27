import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { QuotesRoutingModule } from './quotes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddQuoteComponent } from './components/add-quote/add-quote.component';
import { EditQuoteComponent } from './components/edit-quote/edit-quote.component';
import { MyQuotesComponent } from './components/my-quotes/my-quotes.component';
import { QuoteDetailsComponent } from './components/quote-details/quote-details.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { SingleQuoteComponent } from './components/single-quote/single-quote.component';
import { LikeComponent } from './components/quote-details/like/like.component';

@NgModule({
  declarations: [
    AddQuoteComponent,
    EditQuoteComponent,
    MyQuotesComponent,
    QuoteDetailsComponent,
    QuotesComponent,
    SingleQuoteComponent,
    LikeComponent,
  ],
  imports: [
    CommonModule,
    QuotesRoutingModule,
    FormsModule,
    NgbModule,
    SharedModule,
  ],
})
export class QuotesModule {}
