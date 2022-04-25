import { Component, OnInit } from '@angular/core';
import { UserIdentitySecurityCenterViewComponent } from '@backbase/identity-self-service-journey-ang';

@Component({
  selector: 'bb-user-identity-security-center',
  templateUrl: './user-identity-security-center.component.html',
  styleUrls: ['./user-identity-security-center.component.scss'],
})
export class UserIdentitySecurityCenterComponent extends UserIdentitySecurityCenterViewComponent {}
