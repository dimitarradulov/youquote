import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Quote } from './quote.model';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  quotes = new Subject<Quote[]>();
  error = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getAllQuotes() {
    return this.http.get<Quote[]>(`${environment.baseUrl}/quotes.json`).pipe(
      map((quotes) => {
        return Object.entries(quotes).map((quoteData) => {
          const id = quoteData[0];
          const data = quoteData[1];
          return { id, ...data };
        });
      })
    );
  }

  getSingleQuote(quoteId: string) {
    return this.http.get<Quote>(
      `${environment.baseUrl}/quotes/${quoteId}.json`
    );
  }

  getUserQuotes(userId: string) {
    return this.http.get<Quote[]>(`${environment.baseUrl}/quotes.json`).pipe(
      map((quotesObj) => {
        return Object.entries(quotesObj)
          .filter((quoteData) => quoteData[1].uid === userId)
          .map((quoteTuple) => ({ id: quoteTuple[0], ...quoteTuple[1] }));
      })
    );
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
