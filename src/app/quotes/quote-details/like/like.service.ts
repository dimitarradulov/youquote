import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  quoteLikes = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {}

  getLikesForSingleQuote(quoteId: string) {
    return this.http.get(`${environment.baseUrl}/likes/${quoteId}.json`).pipe(
      map((likes) => {
        if (!likes) return [];

        return Object.entries(likes)
          .filter((x) => x[1])
          .map((x) => x[0]);
      }),
      tap((likes) => this.quoteLikes.next(likes))
    );
  }

  modifyLikes(quoteId: string, likesData: string[]) {
    const likes: { [uid: string]: boolean } = {};

    const likesDataObj = likesData.reduce((prevValue, currValue) => {
      return { ...prevValue, [currValue]: true };
    }, likes);

    this.http
      .put(`${environment.baseUrl}/likes/${quoteId}.json`, likesDataObj)
      .subscribe((data) => console.log('Sucess'));
  }
}
