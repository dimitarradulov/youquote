import { Component, OnInit } from '@angular/core';

import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { QuotesService } from '../quotes/quotes.service';
import { LoadingService } from '../shared/loading-spinner/loading.service';

@Component({
  selector: 'app-my-quotes',
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.scss'],
})
export class MyQuotesComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public quotesService: QuotesService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const user = <User>this.authService.user.getValue();
    this.quotesService.getUserQuotes(user.id);
  }
}
