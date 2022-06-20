import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';
import {
  PaymentFormFieldConfig,
  PaymentFormField,
  PaymentFormFieldOptions,
  Hideable,
  PaymentFormFieldHooks,
} from '@backbase/payment-orders-ang';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { registerFormControl } from '../helpers/form-helpers';
import { triggerHook } from '../helpers/hook-helpers';
import { RestrictedDatesService } from '../services/restricted-dates.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'bb-restricted-dates',
  templateUrl: './restricted-dates.component.html',
})
export class RestrictedDatesComponent implements PaymentFormField, OnInit, OnDestroy {
  options!: PaymentFormFieldOptions;
  config!: PaymentFormFieldConfig & Hideable;
  group!: FormGroup;
  control!: AbstractControl;
  validationControl!: FormControl;

  validationLabel = 'Execution date';
  validationMessages = [{ name: 'restrictedDate', message: 'Cannot transfer on this day' }];
  classes = ['d-inline-block', 'col-md-6', 'align-top'];

  constructor(private restrictedDateService: RestrictedDatesService) {}

  ngOnInit() {
    this.control = registerFormControl(
      this.group,
      this.config.name,
      this.options.validators,
      this.options.asyncValidators,
      this.options.defaultValue,
      this.config,
    ) as FormControl;

    this.classes = this.options.cssClasses.length ? this.options.cssClasses : this.classes;
    this.validationLabel = this.options.validationMessageLabel || this.validationLabel;
    this.validationMessages = [...this.validationMessages, ...this.options.validationMessages];

    this.control.setAsyncValidators([this.restrictedDateService.restrictedDateValidator()]);
    this.control.updateValueAndValidity();
    this.validationControl = this.group.controls[this.config?.name] as FormControl;
    triggerHook(PaymentFormFieldHooks.onInit, this);
  }

  markDisabled$ = this.restrictedDateService.isDateRestricted$.pipe(
    map((isDateRestrictedFn) => {
      return (ngb: NgbDate) => {
        const { year, month, day } = ngb;
        const date = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        return isDateRestrictedFn(date);
      };
    }),
  );

  minDate$: Observable<NgbDateStruct> = this.restrictedDateService.startDate$.pipe(
    map((startDate) => {
      let date = new Date(startDate);

      const pastDateValidatorApplied = this.options.validators.filter(
        (validator) => validator.name === 'pastDateValidator',
      ).length;
      if (pastDateValidatorApplied) {
        const today = new Date().setHours(0, 0, 0, 0);
        if (today > new Date(startDate).setHours(0, 0, 0, 0)) {
          return { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
        }
      }

      return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
    }),
  );

  maxDate$: Observable<NgbDateStruct> = this.restrictedDateService.endDate$.pipe(
    map((endDate) => {
      const date = new Date(endDate);
      return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
    }),
  );

  ngOnDestroy() {
    triggerHook(PaymentFormFieldHooks.onDestroy, this);
  }
}
