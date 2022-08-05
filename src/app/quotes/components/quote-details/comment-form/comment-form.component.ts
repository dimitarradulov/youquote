import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { slice } from 'cypress/types/lodash';

import { AuthService } from 'src/app/auth/services/auth.service';
import {
  Comment,
  CommentService,
} from 'src/app/quotes/services/comment.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() quoteId: string;

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const user = <User>this.authService.user.getValue();
    const { comment } = form.value;

    const commentData: Comment = {
      email: user.email,
      date: new Date().toISOString().slice(0, 10),
      comment,
    };

    this.commentService.update(this.quoteId, commentData);

    form.reset();
  }
}
