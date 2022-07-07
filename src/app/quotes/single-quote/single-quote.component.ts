import { Component, Input, OnInit } from '@angular/core';

import { Quote } from '../quote.model';

@Component({
  selector: 'app-single-quote',
  templateUrl: './single-quote.component.html',
  styleUrls: ['./single-quote.component.scss'],
})
export class SingleQuoteComponent implements OnInit {
  @Input() quote: Quote;

  constructor() {}

  ngOnInit(): void {}
}
