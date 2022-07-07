import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';
import { Quote } from 'src/app/quotes/quote.model';
import { QuotesService } from 'src/app/quotes/quotes.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private quotesService: QuotesService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  getAllQuotes() {
    return this.http
      .get<Quote[]>(`${environment.baseUrl}/quotes.json`)
      .pipe(
        map((quotes) => {
          return Object.entries(quotes).map((quoteData) => {
            const id = quoteData[0];
            const data = quoteData[1];
            return { id, ...data };
          });
        })
      )
      .subscribe({
        next: (quotes) => this.quotesService.quotes.next(quotes),
        error: (err) => this.quotesService.error.next(err.message),
      });
  }

  postQuote(quote: Quote) {
    const user = this.authService.user.getValue();

    this.http
      .post(`${environment.baseUrl}/quotes.json`, {
        ...quote,
        uid: user?.id,
      })
      .subscribe({
        next: (data) => {
          this.router.navigate(['/']);
        },
        error: (err) => console.error(err),
      });
  }

  editQuote(quoteId: string, editedQuote: Quote) {
    this.http
      .put(`${environment.baseUrl}/quotes/${quoteId}.json`, editedQuote)
      .subscribe((_) => {
        this.router.navigate(['/my-quotes']);
      });
  }

  deleteQuote(quoteId: string | null) {
    this.http
      .delete(`${environment.baseUrl}/quotes/${quoteId}.json`)
      .subscribe();
  }
}
