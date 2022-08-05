import { Component, Input, OnInit } from '@angular/core';

import { Comment } from 'src/app/quotes/services/comment.service';

@Component({
  selector: 'single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss'],
})
export class SingleCommentComponent implements OnInit {
  @Input() commentData: Comment;

  constructor() {}

  ngOnInit(): void {}
}
