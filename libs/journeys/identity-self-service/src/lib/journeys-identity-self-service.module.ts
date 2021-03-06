import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IdentitySelfServiceJourneyModule,
  IdentitySelfServiceJourneyConfigurationToken,
  IdentitySelfServiceJourneyConfiguration,
  IdentitySelfServiceJourneyComponent,
  UserManageProfileViewComponent,
  UserLocalizationComponent,
  UserLocalizationCommunicationsViewComponent,
  UserLocalizationChangeLanguageViewComponent,
  DeviceInformationViewComponent,
} from '@backbase/identity-self-service-journey-ang';
import { DeepPartial } from '@backbase/identity-common-ang';

import { HeaderModule, ButtonModule } from '@backbase/ui-ang';
import { UserIdentitySecurityCenterWidgetModule } from '@backbase/user-identity-security-center-widget-ang';
import { UserIdentitySecurityCenterComponent } from './user-identity-security-center/user-identity-security-center.component';

import { FormlyModule } from '@ngx-formly/core';
import {
  InputNewPasswordModule,
  InputNewPasswordComponent,
  InputNewPasswordConfigurationToken,
  InputNewPasswordConfiguration,
} from '@backbase/common-ui-input-new-password';
import {
  passwordHasNumberValidator,
  passwordHasSpecialCharacterValidator,
  passwordHasUppercaseValidator,
  passwordsMatchValidator,
  passwordsMinLengthValidator,
  Validation,
} from './validators';

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

const customRoute = {
  path: '',
  component: IdentitySelfServiceJourneyComponent,
  children: [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    {
      path: 'profile',
      data: {
        title: $localize`:Tab label for managing user profile@@bb-identity-self-service-journey.tab-user-manage-profile:Profile`,
      },
      component: UserManageProfileViewComponent,
    },
    {
      path: 'user-localization',
      data: {
        title: $localize`:Tab label for changing user preferences@@bb-identity-self-service-journey.tab-localization:Localization`,
      },
      component: UserLocalizationComponent,
      children: [
        { path: '', redirectTo: 'communications', pathMatch: 'full' },
        {
          path: 'communications',
          component: UserLocalizationCommunicationsViewComponent,
        },
        {
          path: 'change-language',
          component: UserLocalizationChangeLanguageViewComponent,
        },
      ],
    },
    {
      path: 'login-security',
      data: {
        title: $localize`:Tab label for login and security settings@@bb-identity-self-service-journey.tab-login-security:Login & security`,
      },
      component: UserIdentitySecurityCenterComponent,
    },
    {
      path: 'devices',
      data: {
        title: $localize`:Tab label for managing devices@@bb-identity-self-service-journey.tab-devices:Devices`,
      },
      component: DeviceInformationViewComponent,
    },
  ],
};

@NgModule({
  imports: [
    CommonModule,
    IdentitySelfServiceJourneyModule.forRoot({ route: customRoute }),
    HeaderModule,
    ButtonModule,
    UserIdentitySecurityCenterWidgetModule,
    InputNewPasswordModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'new-password',
          component: InputNewPasswordComponent,
        },
      ],
      validators: [
        { name: Validation.PasswordMinLength, validation: passwordsMinLengthValidator },
        { name: Validation.PasswordHasNumber, validation: passwordHasNumberValidator },
        { name: Validation.PasswordHasUppercase, validation: passwordHasUppercaseValidator },
        { name: Validation.PasswordHasSpecialCharacter, validation: passwordHasSpecialCharacterValidator },
        { name: Validation.PasswordsMatch, validation: passwordsMatchValidator },
      ],
    }),
  ],
  providers: [
    ProfileConfigProvider,
    {
      provide: InputNewPasswordConfigurationToken,
      useValue: <InputNewPasswordConfiguration>{
        requirementIcon: 'success',
        validators: [
          {
            label: $localize`At least 8 characters`,
            name: Validation.PasswordMinLength,
            validation: passwordsMinLengthValidator,
          },
          {
            label: $localize`Include a number`,
            name: Validation.PasswordHasNumber,
            validation: passwordHasNumberValidator,
          },
          {
            label: $localize`Include an uppercase`,
            name: Validation.PasswordHasUppercase,
            validation: passwordHasUppercaseValidator,
          },
          {
            label: $localize`Include a special character`,
            name: Validation.PasswordHasSpecialCharacter,
            validation: passwordHasSpecialCharacterValidator,
          },
          {
            label: $localize`Passwords match`,
            name: Validation.PasswordsMatch,
            validation: passwordsMatchValidator,
            confirm: true,
          },
        ],
      },
    },
  ],
  declarations: [UserIdentitySecurityCenterComponent],
})
export class JourneysIdentitySelfServiceModule {}
