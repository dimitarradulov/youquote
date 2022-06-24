import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
  isLoading = false;
  error = null;

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.error = null;
    this.quotesSub = this.quotesService.getAllQuotes().subscribe({
      next: (quotesData) => {
        this.quotes = quotesData;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = err.message;
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.quotesSub.unsubscribe();
  }
}
