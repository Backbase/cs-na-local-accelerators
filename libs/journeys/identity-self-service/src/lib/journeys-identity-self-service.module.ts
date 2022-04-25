import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IdentitySelfServiceJourneyModule,
  IdentitySelfServiceJourneyConfigurationToken,
  IdentitySelfServiceJourneyConfiguration,
} from '@backbase/identity-self-service-journey-ang';
import { DeepPartial } from '@backbase/identity-common-ang';
import { UserIdentitySecurityCenterComponent } from './user-identity-security-center/user-identity-security-center.component';

const ProfileConfigProvider: Provider = {
  provide: IdentitySelfServiceJourneyConfigurationToken,
  useValue: {
    userManageProfile: {
      maxEmailAddresses: 2,
      maxPhoneNumbers: 3,
      maxPostalAddresses: 1,
    },
  } as DeepPartial<IdentitySelfServiceJourneyConfiguration>,
};

@NgModule({
  imports: [CommonModule, IdentitySelfServiceJourneyModule.forRoot()],
  providers: [ProfileConfigProvider],
  declarations: [UserIdentitySecurityCenterComponent],
})
export class JourneysIdentitySelfServiceModule {}
