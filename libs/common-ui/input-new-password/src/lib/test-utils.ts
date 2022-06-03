import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { NewPasswordValidatorConfiguration } from './input-new-password.configuration';

export const MINIMUM_PASSWORD_LENGTH = 8;
export const numbersRegex = new RegExp('[0-9]');
export const upperCaseRegex = new RegExp('[A-Z]');
export const specialCharactersRegex = new RegExp('[^A-Za-z0-9]');

export enum Validation {
  PasswordsMatch = 'passwordsMatch',
  PasswordMinLength = 'passwordMinLength',
  PasswordHasNumber = 'passwordHasNumber',
  PasswordHasUppercase = 'passwordHasUppercase',
  PasswordHasSpecialCharacter = 'passwordHasSpecialCharacter',
}

export function passwordsMatchValidator(control: AbstractControl) {
  const form: FormGroup | FormArray = control.parent;
  if (form) {
    const compareToKey = 'inputNewPassword'; // "new-password" is a "key" value matching the one from Formly fieldGroup
    const confirmValue = form.get(compareToKey).value;
    if (control.value === confirmValue) {
      return null;
    }
    return { [Validation.PasswordsMatch]: true };
  }
  return null;
}

export function passwordsMinLengthValidator({ value }: AbstractControl): null | ValidationErrors {
  return value && value.toString().length >= MINIMUM_PASSWORD_LENGTH ? null : { [Validation.PasswordMinLength]: true };
}

export function passwordHasNumberValidator({ value }: AbstractControl): null | ValidationErrors {
  return numbersRegex.test(value || '') ? null : { [Validation.PasswordHasNumber]: true };
}

export function passwordHasUppercaseValidator({ value }: AbstractControl): null | ValidationErrors {
  return upperCaseRegex.test(value || '') ? null : { [Validation.PasswordHasUppercase]: true };
}

export function passwordHasSpecialCharacterValidator({ value }: AbstractControl): null | ValidationErrors {
  return specialCharactersRegex.test(value || '') ? null : { [Validation.PasswordHasSpecialCharacter]: true };
}

export const configValidators: NewPasswordValidatorConfiguration[] = [
  {
    label: 'At least 8 characters',
    name: Validation.PasswordMinLength,
    validation: passwordsMinLengthValidator,
  },
  {
    label: 'Include a number',
    name: Validation.PasswordHasNumber,
    validation: passwordHasNumberValidator,
  },
  {
    label: 'Include an uppercase',
    name: Validation.PasswordHasUppercase,
    validation: passwordHasUppercaseValidator,
  },
  {
    label: 'Include a special character',
    name: Validation.PasswordHasSpecialCharacter,
    validation: passwordHasSpecialCharacterValidator,
  },
  {
    label: 'Passwords match',
    name: Validation.PasswordsMatch,
    validation: passwordsMatchValidator,
    confirm: true,
  },
];
