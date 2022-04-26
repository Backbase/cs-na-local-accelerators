import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNewPasswordComponent } from './input-new-password.component';

describe('InputNewPasswordComponent', () => {
  let component: InputNewPasswordComponent;
  let fixture: ComponentFixture<InputNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputNewPasswordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
