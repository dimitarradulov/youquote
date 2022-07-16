import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { QuotesService } from '../quotes/quotes.service';
import { LoadingService } from '../shared/loading-spinner/loading.service';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.scss'],
})
export class AddQuoteComponent implements OnInit {
  constructor(
    public loadingService: LoadingService,
    private quotesService: QuotesService
  ) {}

  ngOnInit(): void {}

  onFormSubmit(form: NgForm) {
    this.quotesService.create(form.value);
  }
}
