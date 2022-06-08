import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestrictedDatesComponent } from './components/restricted-dates.component';
import { PayordFormBuilderAngModule } from '@backbase/payord-form-builder-ang';
import { RestrictedDatesService } from './services/restricted-dates.service';
import { TransfersRestrictedDatesApiModule, TransfersRestrictedDatesConfiguration } from '@backbase/common-data-transfers-dates-http-ang';

@NgModule({
  declarations: [RestrictedDatesComponent],
  imports: [CommonModule, PayordFormBuilderAngModule, TransfersRestrictedDatesApiModule.forRoot(() => new TransfersRestrictedDatesConfiguration())],
  providers: [RestrictedDatesService],
  exports: [RestrictedDatesComponent],
})
export class RestrictedDatesModule {}
