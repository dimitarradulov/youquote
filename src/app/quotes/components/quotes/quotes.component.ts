import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Quote } from 'src/app/shared/models/quote.model';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { QuotesService } from '../../services/quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent implements OnInit, OnDestroy {
  quotes: Quote[] | null = [];
  quotesSub: Subscription;
  error = null;

  constructor(
    private quotesService: QuotesService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.error = null;
    this.quotesSub = this.quotesService.getAll().subscribe({
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
