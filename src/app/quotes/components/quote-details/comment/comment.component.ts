import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() clicked = false;
  @Output() clickedChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  toggleClicked() {
    this.clicked = !this.clicked;
    this.clickedChange.emit(this.clicked);
  }
}
