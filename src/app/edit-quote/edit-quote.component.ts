import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Quote } from '../quotes/quote.model';
import { QuotesService } from '../quotes/quotes.service';
import { LoadingService } from '../shared/loading-spinner/loading.service';

@Component({
  selector: 'app-edit-quote',
  templateUrl: './edit-quote.component.html',
  styleUrls: ['./edit-quote.component.scss'],
})
export class EditQuoteComponent implements OnInit, OnDestroy {
  quote: Quote;
  quoteId: string;
  quoteSub: Subscription;
  error = null;

  constructor(
    public loadingService: LoadingService,
    private quotesService: QuotesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.error = null;
    this.quoteId = this.route.snapshot.params['quoteId'];
    this.quoteSub = this.quotesService.getSingleQuote(this.quoteId).subscribe({
      next: (quoteData) => (this.quote = quoteData),
      error: (err) => {
        console.error(err);
        this.error = err.message;
      },
    });
  }

  onEdit(form: NgForm) {
    this.quotesService.editQuote(this.quoteId, {
      ...form.value,
      uid: this.quote.uid,
    });
  }

  ngOnDestroy(): void {
    this.quoteSub.unsubscribe();
  }
}
