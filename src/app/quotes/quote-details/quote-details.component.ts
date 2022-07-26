import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from 'src/app/auth/user.model';
import { Quote } from '../../shared/models/quote.model';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingService } from 'src/app/shared/loading-spinner/loading.service';
import { QuotesService } from '../quotes.service';
import { LikeService } from './like/like.service';

@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.component.html',
  styleUrls: ['./quote-details.component.scss'],
})
export class QuoteDetailsComponent implements OnInit, OnDestroy {
  quote: Quote;
  quoteId: string;
  liked: boolean;
  likes = 0;
  user: User | null;
  error = null;
  subsciption: Subscription;

  constructor(
    private quotesService: QuotesService,
    private route: ActivatedRoute,
    private likeService: LikeService,
    public authService: AuthService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.quoteId = this.route.snapshot.params['quoteId'];

    this.user = this.authService.user.getValue();

    this.error = null;
    this.subsciption = this.quotesService.getOne(this.quoteId).subscribe({
      next: (quoteData) => {
        this.quote = quoteData;
      },
      error: (err) => {
        console.error(err);
        this.error = err.error?.error
          ? err.error.error
          : 'Error fetching the quote details. Please try again!';
      },
    });

    this.likeService.getLikesForSingleQuote(this.quoteId).subscribe((likes) => {
      this.likes = likes.length;
      this.liked = likes.some((uid) => uid === this.user?.id);
    });
  }

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }

  onLikeHandler(num: number) {
    this.likes += num;
    let quoteLikes = this.likeService.quoteLikes.getValue();
    if (this.liked) quoteLikes.push(<string>this.user?.id);
    else quoteLikes = quoteLikes.filter((uid) => uid !== <string>this.user?.id);
    this.likeService.modifyLikes(this.quoteId, quoteLikes);
  }
}
