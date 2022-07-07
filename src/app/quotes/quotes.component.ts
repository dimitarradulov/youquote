import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingService } from '../shared/loading-spinner/loading.service';
import { Quote } from './quote.model';
import { QuotesService } from './quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent implements OnInit, OnDestroy {
  quotes: Quote[] = [];
  private quotesSub: Subscription;
  error = null;

  constructor(
    private quotesService: QuotesService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.error = null;
    this.quotesSub = this.quotesService.getAllQuotes().subscribe({
      next: (quotesData) => {
        this.quotes = quotesData;
      },
      error: (err) => {
        console.error(err);
        this.error = err.message;
      },
    });
  }

  ngOnDestroy(): void {
    this.quotesSub.unsubscribe();
  }
}
