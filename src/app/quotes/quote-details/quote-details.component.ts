import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from 'src/app/shared/loading-spinner/loading.service';
import { Quote } from '../quote.model';
import { QuotesService } from '../quotes.service';

@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.component.html',
  styleUrls: ['./quote-details.component.scss'],
})
export class QuoteDetailsComponent implements OnInit, OnDestroy {
  quote: Quote;
  error = null;
  subsciption: Subscription;

  constructor(
    private quotesService: QuotesService,
    private route: ActivatedRoute,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const { quoteId } = this.route.snapshot.params;

    this.error = null;
    this.subsciption = this.quotesService.getOne(quoteId).subscribe({
      next: (quoteData) => (this.quote = quoteData),
      error: (err) => {
        console.error(err);
        this.error = err.error?.error
          ? err.error.error
          : 'Error fetching the quote details. Please try again!';
      },
    });
  }

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }
}
