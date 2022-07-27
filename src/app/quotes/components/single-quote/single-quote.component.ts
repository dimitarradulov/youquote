import { Component, Input } from '@angular/core';

import { Quote } from 'src/app/shared/models/quote.model';

@Component({
  selector: 'app-single-quote',
  templateUrl: './single-quote.component.html',
  styleUrls: ['./single-quote.component.scss'],
})
export class SingleQuoteComponent {
  @Input() quote: Quote;
}
