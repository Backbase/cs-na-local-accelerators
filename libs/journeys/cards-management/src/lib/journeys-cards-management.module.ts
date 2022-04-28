import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsManagementJourneyModule } from '@backbase/cards-management-journey-ang';

@NgModule({
  imports: [CommonModule, CardsManagementJourneyModule.forRoot()],
})
export class JourneysCardsManagementModule {}
