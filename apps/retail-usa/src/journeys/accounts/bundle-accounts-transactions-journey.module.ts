import { NgModule, Provider } from '@angular/core';
import {
  AccountsTransactionsJourneyModule,
  AccountsTransactionsJourneyConfigurationToken,
  AccountsTransactionsJourneyConfiguration,
  AccountsPaymentsCommunication,
  AccountsTransactionsJourneyComponent,
  AccountsListComponent,
  AccountsManageComponent,
  AccountsManageGuardService,
  AccountsDetailsTabComponent,
  TransactionsListComponent,
  TransactionDetailsComponent,
  AccountsDetailsComponent,
} from '@backbase/accounts-transactions-journey-ang';
import { AccountsInitiatePaymentCommunication } from '../../communication/accounts-initiate-payment-communication.service';

/*
 *  New imports for view replacement, TransactionsListComponent
 */
import { RouterModule } from '@angular/router';
import { TransactionsListWidgetModule } from '@backbase/transactions-list-widget-ang';
import { ExtendedTransactionsListComponent } from './views/transactions-list.component';

const extendedRoute = {
  path: '',
  component: AccountsTransactionsJourneyComponent,
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
    {
      path: 'list',
      component: AccountsListComponent,
      data: { title: 'My Accounts' },
    },
    {
      path: 'manage',
      component: AccountsManageComponent,
      canActivate: [AccountsManageGuardService],
    },
    {
      path: 'transactions',
      component: AccountsDetailsTabComponent,
      data: { title: 'Transactions' },
      children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        {
          path: 'list',
          component: ExtendedTransactionsListComponent,
          data: { title: 'List' },
          children: [
            {
              path: 'detail',
              component: TransactionDetailsComponent,
            },
          ],
        },
        {
          path: 'details',
          component: AccountsDetailsComponent,
          data: { title: 'Details' },
        },
      ],
    },
  ],
};

const AccountsTransactionsConfigProvider: Provider = {
  provide: AccountsTransactionsJourneyConfigurationToken,
  useValue: {
    showCheckImages: true,
    disputeTopicId: '',
    inquireTopicId: '',
  } as Partial<AccountsTransactionsJourneyConfiguration>,
};

@NgModule({
  declarations: [ExtendedTransactionsListComponent],
  imports: [RouterModule, TransactionsListWidgetModule, AccountsTransactionsJourneyModule.forRoot({ route: extendedRoute })],
  providers: [
    AccountsTransactionsConfigProvider,
    {
      provide: AccountsPaymentsCommunication,
      useExisting: AccountsInitiatePaymentCommunication,
    },
  ],
})
export class AccountsTransactionsJourneyBundleModule {}
