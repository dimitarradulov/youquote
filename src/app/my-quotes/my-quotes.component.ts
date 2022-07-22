import { Component, OnDestroy, OnInit } from '@angular/core';

import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { QuotesService } from '../quotes/quotes.service';
import { LoadingService } from '../shared/loading-spinner/loading.service';
import { Quote } from '../quotes/quote.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-quotes',
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.scss'],
})
export class MyQuotesComponent implements OnInit, OnDestroy {
  userQuotes: Quote[] = [];
  showConfirmModal = false;
  confirmQuoteDelete = false;
  subsciption: Subscription;

  constructor(
    private authService: AuthService,
    public quotesService: QuotesService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const user = <User>this.authService.user.getValue();
    this.quotesService.getUserQuotes(user.id);

    this.subsciption = this.quotesService.userQuotesChanges.subscribe(
      (quotes) => (this.userQuotes = quotes)
    );
  }

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }

  hideConfirmModal() {
    this.showConfirmModal = false;
  }
}
