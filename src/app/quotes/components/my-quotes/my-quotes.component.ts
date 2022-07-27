import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../../auth/services/auth.service';
import { QuotesService } from '../../services/quotes.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { Quote } from '../../../shared/models/quote.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-quotes',
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.scss'],
})
export class MyQuotesComponent implements OnInit, OnDestroy {
  userQuotes: Quote[] = [];
  subsciption: Subscription;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private quotesService: QuotesService,
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

  openModal(modal: any, quoteId: string) {
    this.modalService.open(modal).result.then(
      (result) => {
        if (result === 'yes') this.quotesService.delete(quoteId);
      },
      (reason) => {
        return null;
      }
    );
  }
}
