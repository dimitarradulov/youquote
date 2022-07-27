import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorComponent } from './components/error/error.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [ErrorComponent, LoadingSpinnerComponent, TruncatePipe],
  imports: [CommonModule],
  exports: [ErrorComponent, LoadingSpinnerComponent, TruncatePipe],
})
export class SharedModule {}
