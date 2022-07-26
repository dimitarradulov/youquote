import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent implements OnInit {
  @Input() liked = false;
  @Output() likedChange = new EventEmitter<boolean>();
  @Output() onLike = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.liked = !this.liked;
    this.likedChange.emit(this.liked);

    if (!this.liked) this.onLike.emit(-1);
    else this.onLike.emit(1);
  }
}
