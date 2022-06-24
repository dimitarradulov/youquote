import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  constructor(private http: HttpClient) {}

  getAllQuotes() {
    return this.http
      .get(
        'https://youquote-c2e6d-default-rtdb.europe-west1.firebasedatabase.app/quotes.json'
      )
      .pipe(
        map((quotes) => {
          return Object.entries(quotes).map((quoteData) => {
            const id = quoteData[0];
            const data = quoteData[1];
            return { id, ...data };
          });
        })
      );
  }
}
