import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { QuotesComponent } from './quotes/quotes.component';
import { AuthComponent } from './auth/auth.component';
import { SingleQuoteComponent } from './quotes/single-quote/single-quote.component';
import { MyQuotesComponent } from './my-quotes/my-quotes.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ErrorComponent } from './shared/error/error.component';
import { LoadingInterceptor } from './shared/loading-spinner/loading.interceptor';
import { EditQuoteComponent } from './edit-quote/edit-quote.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { QuoteDetailsComponent } from './quotes/quote-details/quote-details.component';
import { TruncatePipe } from './shared/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuotesComponent,
    AuthComponent,
    SingleQuoteComponent,
    MyQuotesComponent,
    AddQuoteComponent,
    LoadingSpinnerComponent,
    ErrorComponent,
    EditQuoteComponent,
    QuoteDetailsComponent,
    TruncatePipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
