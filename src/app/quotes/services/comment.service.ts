import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

export interface Comment {
  email: string;
  date: Date | string;
  comment: string;
}

@Injectable()
export class CommentService {
  private comments: Comment[] = [];
  commentsChange = new Subject<Comment[]>();

  constructor(private http: HttpClient) {}

  get(quoteId: string) {
    return this.http
      .get<Comment[] | null>(`${environment.baseUrl}/comments/${quoteId}.json`)
      .pipe(
        tap((val) => {
          if (val) {
            this.comments = val;
            this.commentsChange.next([...this.comments]);
          }
        })
      );
  }

  update(quoteId: string, comment: Comment) {
    this.http
      .put(`${environment.baseUrl}/comments/${quoteId}.json`, [
        ...this.comments,
        comment,
      ])
      .subscribe(() => {
        this.comments.push(comment);
        this.commentsChange.next([...this.comments]);
      });
  }
}
