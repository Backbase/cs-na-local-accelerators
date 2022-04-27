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
  //model = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row mb-2 mt-4',
      fieldGroup: [
        {
          key: 'new-password',
          className: 'col-12 col-lg-8 pb-3',
          type: 'new-password',
          templateOptions: {
            label: $localize`Create A Password`,
            required: true,
            showVisibilityControl: true,
            confirm: false, // "true" is for "confirm password" mode
          },
        },

        {
          key: 'confirm-new-password', // key must be different from the "new pasword" field's key
          className: 'col-12 col-lg-8 pb-3',
          type: 'new-password',
          templateOptions: {
            label: $localize`Confirm Password`,
            required: true,
            showVisibilityControl: true,
            confirm: true, // "true" is for "confirm password" mode
          },
        },
      ],
    },
  ];
}
