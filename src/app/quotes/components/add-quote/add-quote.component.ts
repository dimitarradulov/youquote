import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { QuotesService } from '../../services/quotes.service';
import { LoadingService } from '../../../shared/services/loading.service';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.scss'],
})
export class AddQuoteComponent {
  constructor(
    public loadingService: LoadingService,
    private quotesService: QuotesService
  ) {}

  onFormSubmit(form: NgForm) {
    this.quotesService.create(form.value);
  }
}
