import { Component } from "@angular/core";
import { TransactionsListComponent } from "@backbase/accounts-transactions-journey-ang";

@Component({
  selector: "bb-transactions-list-extended",
  template: `<p>this is my extended view</p><bb-transactions-list-widget
      [googleAPIKey]="config.apiKey"
      [pageSize]="config.itemsPerPage"
      [maxNavPages]="config.transactionsMaxPages"
      [paginationType]="config.paginationType"
      [showPendingTransactionsOnTop]="config.pendingOnTop"
      [initialFilterOptions]="config.transactionsFilterParameters"
      [initialSortOptions]="config.transactionsSortOptions"
      [showControls]="true"
      [showChangeCategory]="true"
      [showCheckImage]="config.showCheckImages"
      [getOrPostEndpoints]="config.getOrPostEndpoints"
      [enableDisputeAndInquiry]="config.enableDisputeAndInquiry"
      [disputeEligibilityDays]="config.disputeEligibilityDays"
      [disputeTransactionTypes]="config.disputeTransactionTypes"
      [disputeByBillingStatus]="config.disputeByBillingStatus"
      [inquireTopicId]="config.inquireTopicId"
      [disputeTopicId]="config.disputeTopicId"
      [availableFiltersConfig]="config.availableFiltersConfig"
      (transactionSelected)="getTransaction($event)"
      (transactionsLoaded)="transactionsLoaded($event)"
    ></bb-transactions-list-widget>
    <router-outlet></router-outlet>`
})
export class ExtendedTransactionsListComponent extends TransactionsListComponent {}
