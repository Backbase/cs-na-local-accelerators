import { NgModule } from '@angular/core';
import { IdentityManagementServiceMocksProvider } from '@backbase/data-ang/user';
import {
  INITIATE_PAYMENT_CONFIG,
  InitiatePaymentJourneyModule,
  INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,

  PayordOmniPaymentConfigProvider,
  ReviewScreens,
} from '@backbase/initiate-payment-journey-ang';
import { PaymentsCommunicationService } from '../../communication/payments-communication.service';
import { RestrictedDatesModule, INTERNAL_TRANSFER } from '@backbase/common-transfers-restricted-dates';

@NgModule({
  imports: [RestrictedDatesModule, InitiatePaymentJourneyModule.forRoot()],
  providers: [
    PayordOmniPaymentConfigProvider,
    IdentityManagementServiceMocksProvider,
    {
      provide: INITIATE_PAYMENT_CONFIG,
      useValue: {
        paymentTypes: [INTERNAL_TRANSFER],
        businessFunctions: [INTERNAL_TRANSFER.businessFunction],
        options: {
          enablePaymentTemplateSelector: false,
          enableSavePaymentAsTemplate: false,
          reviewScreenType: ReviewScreens.ADAPTED,
          isModalView: false,
        },
      },
    },
    {
      provide: INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,
      useExisting: PaymentsCommunicationService,
    },
  ],
})
export class InternalTransferJourneyBundleModule {}
