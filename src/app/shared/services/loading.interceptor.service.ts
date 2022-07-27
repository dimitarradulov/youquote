import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor(private loadingService: LoadingService) {}

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1); // This removes the request from our array
    }
    // Let's tell our service of the updated status
    this.loadingService.isLoading.next(this.requests.length > 0);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loadingService.isLoading.next(true);
    // We create a new observable which we return instead of the original
    return new Observable((observer) => {
      // And subscribe to the original observable to ensure the HttpRequest is made
      const subscription = next.handle(req).subscribe({
        next: (event) => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        error: (err) => {
          this.removeRequest(req);
          observer.error(err);
        },
        complete: () => {
          this.removeRequest(req);
          observer.complete();
        },
      });
      // return teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
