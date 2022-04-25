import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdentitySecurityCenterComponent } from './user-identity-security-center.component';

describe('UserIdentitySecurityCenterComponent', () => {
  let component: UserIdentitySecurityCenterComponent;
  let fixture: ComponentFixture<UserIdentitySecurityCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserIdentitySecurityCenterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIdentitySecurityCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
