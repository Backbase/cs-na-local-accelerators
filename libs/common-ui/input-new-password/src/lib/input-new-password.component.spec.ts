import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import {
  configValidators as validators,
  passwordHasNumberValidator,
  passwordHasSpecialCharacterValidator,
  passwordHasUppercaseValidator,
  passwordsMatchValidator,
  passwordsMinLengthValidator,
  Validation,
} from './test-utils';

import { InputNewPasswordComponent } from './input-new-password.component';
import { InputNewPasswordModule } from './input-new-password.module';
import { InputNewPasswordConfiguration, InputNewPasswordConfigurationToken } from './input-new-password.configuration';

@Component({
  selector: 'app-test',
  template: ` <form [formGroup]="form">
    <formly-form [fields]="fields" [form]="form"></formly-form>
  </form>`,
})
class MockFormComponent {
  form = new FormGroup({});
  model = { newPassword: '%Newpassword123' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'newPassword',
      type: 'new-password',
      templateOptions: {
        label: 'New password',
        required: true,
        showVisibilityControl: true,
        confirm: false,
      },
    },
  ];
}

describe('InputNewPasswordComponent', () => {
  let mockParentComponent: MockFormComponent;
  let component: InputNewPasswordComponent;
  let fixture: ComponentFixture<MockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockFormComponent],
      imports: [
        InputNewPasswordModule,
        ReactiveFormsModule,
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
        {
          provide: InputNewPasswordConfigurationToken,
          useValue: <InputNewPasswordConfiguration>{
            requirementIcon: 'success',
            validators,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockFormComponent);
    mockParentComponent = fixture.componentInstance;
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(InputNewPasswordComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only return the required validators', () => {
    expect(
      component.getValidators({
        validators: [validators[0], validators[1], validators[4]],
      }).length,
    ).toEqual(2);
  });

  it('should add the required validators to the formControl', () => {
    component.ngOnInit();
    expect(component.formControl.hasValidator(passwordsMinLengthValidator)).toBe(true);
    expect(component.formControl.hasValidator(passwordHasNumberValidator)).toBe(true);
    expect(component.formControl.hasValidator(passwordHasUppercaseValidator)).toBe(true);
    expect(component.formControl.hasValidator(passwordHasSpecialCharacterValidator)).toBe(true);
    expect(component.formControl.hasValidator(passwordsMatchValidator)).toBe(false);
  });

  it('should have a working toggle password visibility icon button', () => {
    component.ngOnInit();
    const toggleVisibilityIcon = fixture.nativeElement.querySelector('button');
    expect(toggleVisibilityIcon).toBeDefined();

    const testInput = fixture.nativeElement.querySelector('input');
    toggleVisibilityIcon.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(testInput.attributes.type.value).toBe('text');

    toggleVisibilityIcon.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(testInput.attributes.type.value).toBe('password');
  });

  it('should validate the password policy', () => {
    const testInput = fixture.nativeElement.querySelector('input');
    expect(testInput).toBeDefined();

    testInput.value = 'abcde';
    testInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.formControl.errors[Validation.PasswordMinLength]).toBeTruthy();
    expect(component.formControl.errors[Validation.PasswordHasNumber]).toBeTruthy();
    expect(component.formControl.errors[Validation.PasswordHasSpecialCharacter]).toBeTruthy();
    expect(component.formControl.errors[Validation.PasswordHasUppercase]).toBeTruthy();

    testInput.value = '%Newpassword123';
    testInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.formControl.errors).toBeNull();
  });

  describe('Confirm Password Inputs', () => {
    let form: FormGroup | FormArray;
    beforeEach(() => {
      form = component.formControl.parent as FormGroup;
      form.addControl('inputNewPassword', new FormControl('%Newpassword123'));
      mockParentComponent.fields[0].templateOptions['confirm'] = true;
      fixture.detectChanges();
    });

    afterAll(() => {
      form = component.formControl.parent as FormGroup;
      form.removeControl('new');
      mockParentComponent.fields[0].templateOptions['confirm'] = false;
      fixture.detectChanges();
    });

    it('should set a form value change listener for confirm password inputs', () => {
      spyOn(component, 'setFormListener');
      component.ngOnInit();
      expect(component.setFormListener).toHaveBeenCalled();
      expect(component.formControl.hasValidator(passwordsMatchValidator)).toBe(true);
    });

    it('should show an error if the passwords do not match', () => {
      component.ngOnInit();
      const testInput = fixture.nativeElement.querySelector('input');
      testInput.value = 'Someotherpassword';
      testInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.formControl.errors[Validation.PasswordsMatch]).toBeTruthy();
    });
  });
});
