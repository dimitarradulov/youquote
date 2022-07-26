import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Quote } from '../shared/models/quote.model';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private userQuotes: Quote[] = [];
  userQuotesChanges = new BehaviorSubject<Quote[]>([]);

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getAll() {
    return this.http.get<Quote[]>(`${environment.baseUrl}/quotes.json`).pipe(
      map((quotes) => {
        if (!quotes) return null;

        return Object.entries(quotes).map((quoteData) => {
          const id = quoteData[0];
          const data = quoteData[1];
          return { id, ...data };
        });
      })
    );
  }

  getOne(quoteId: string) {
    return this.http.get<Quote>(
      `${environment.baseUrl}/quotes/${quoteId}.json`
    );
  }

  getUserQuotes(userId: string) {
    this.http
      .get<Quote[]>(`${environment.baseUrl}/quotes.json`)
      .pipe(
        map((quotesObj) => {
          return Object.entries(quotesObj)
            .filter((quoteData) => quoteData[1].uid === userId)
            .map((quoteTuple) => ({ id: quoteTuple[0], ...quoteTuple[1] }));
        })
      )
      .subscribe((quotes) => {
        this.userQuotes = quotes;
        this.userQuotesChanges.next(quotes);
      });
  }

  create(quote: Quote) {
    const user = this.authService.user.getValue();

    this.http
      .post(`${environment.baseUrl}/quotes.json`, {
        ...quote,
        uid: user?.id,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => console.error(err),
      });
  }

  edit(quoteId: string, editedQuote: Quote) {
    return this.http.put(
      `${environment.baseUrl}/quotes/${quoteId}.json`,
      editedQuote
    );
  }

  delete(quoteId: string | null) {
    this.http
      .delete(`${environment.baseUrl}/quotes/${quoteId}.json`)
      .subscribe(() => {
        const quoteIndex = this.userQuotes.findIndex(
          (quote) => quote.id === quoteId
        );
        this.userQuotes.splice(quoteIndex, 1);
        this.userQuotesChanges.next(this.userQuotes);
      });
  }
}
