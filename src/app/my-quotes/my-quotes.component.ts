import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { Quote } from '../quotes/quote.model';
import { QuotesService } from '../quotes/quotes.service';
import { LoadingService } from '../shared/loading-spinner/loading.service';

@Component({
  selector: 'app-my-quotes',
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.scss'],
})
export class MyQuotesComponent implements OnInit, OnDestroy {
  quotes: Quote[];
  quotesSub: Subscription;

  constructor(
    private quotesService: QuotesService,
    private authService: AuthService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const user = this.authService.user.getValue();

    this.quotesSub = this.quotesService
      .getUserQuotes(user?.id!)
      .subscribe((quotesData) => (this.quotes = quotesData));
  }

  onDelete(quoteId: string | null) {
    this.quotesService.deleteQuote(quoteId);
  }

  ngOnDestroy(): void {
    this.quotesSub.unsubscribe();
  }
}
