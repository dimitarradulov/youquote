import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent {
  @Input() liked = false;
  @Output() likedChange = new EventEmitter<boolean>();
  @Output() onLike = new EventEmitter<number>();

  onClick() {
    this.liked = !this.liked;
    this.likedChange.emit(this.liked);

    if (!this.liked) this.onLike.emit(-1);
    else this.onLike.emit(1);
  }
}
