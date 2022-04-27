import { Component, OnInit } from '@angular/core';
import { UserIdentitySecurityCenterViewComponent } from '@backbase/identity-self-service-journey-ang';
import { UserDataService } from '@backbase/user-common';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'bb-user-identity-security-center',
  templateUrl: './user-identity-security-center.component.html',
  styleUrls: ['./user-identity-security-center.component.scss'],
  providers: [UserDataService],
})
export class UserIdentitySecurityCenterComponent extends UserIdentitySecurityCenterViewComponent {
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'd-block',
      fieldGroup: [
        {
          key: 'inputNewPassword',
          className: 'bb-form-field bb-form-field--md bb-block bb-block--xl',
          type: 'new-password',
          templateOptions: {
            label: $localize`New password`,
            required: true,
            showVisibilityControl: true,
            confirm: false, // "true" is for "confirm password" mode
          },
        },
        {
          key: 'confirmNewPassword', // key must be different from the "new pasword" field's key
          className: 'bb-form-field bb-form-field--md bb-block bb-block--xl',
          type: 'new-password',
          templateOptions: {
            label: $localize`Confirm password`,
            required: true,
            showVisibilityControl: true,
            confirm: true, // "true" is for "confirm password" mode
          },
        },
      ],
    },
  ];
}
