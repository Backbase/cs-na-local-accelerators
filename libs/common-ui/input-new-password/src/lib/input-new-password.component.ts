import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import {
  InputNewPasswordConfiguration,
  InputNewPasswordConfigurationToken,
  NewPasswordValidatorConfiguration,
} from './input-new-password.configuration';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'bb-input-new-password',
  templateUrl: './input-new-password.component.html',
  styleUrls: ['./input-new-password.component.scss'],
})
export class InputNewPasswordComponent extends FieldType implements OnInit, OnDestroy {
  formControl!: FormControl;
  config: InputNewPasswordConfiguration;
  destroy$ = new Subject();
  requirementIcon = 'success'; // default 'success'

  constructor(@Optional() @Inject(InputNewPasswordConfigurationToken) _config: InputNewPasswordConfiguration) {
    super();
    this.config = _config;
  }

  ngOnInit(): void {
    this.formControl.addValidators(this.getValidators(this.config));

    // it's important to check if "confirm-password" value still matches if "new-password" field value changes
    if (this.to.confirm) {
      this.setFormListener();
    }

    if (this.config.requirementIcon) {
      this.requirementIcon = this.config.requirementIcon;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getValidators(config: InputNewPasswordConfiguration): ValidatorFn[] {
    const validators = config.validators.reduce((validators: ValidatorFn[], vc: NewPasswordValidatorConfiguration) => {
      if (this.to.confirm === !!vc.confirm) {
        validators.push(vc.validation);
      }
      return validators;
    }, []);
    return validators;
  }

  // this sets the form value change listener to re-evaluate validity of the field on every form value change
  setFormListener() {
    const form = this.formControl.parent;
    if (form) {
      form.valueChanges
        .pipe(
          tap(() => {
            this.formControl.updateValueAndValidity({ onlySelf: true });
            this.formControl.markAsUntouched();
            if (this.formControl.invalid) {
              form.setErrors({}); // to set parent form invalid
            }
          }),
          takeUntil(this.destroy$),
        )
        .subscribe();
    }
  }
}
