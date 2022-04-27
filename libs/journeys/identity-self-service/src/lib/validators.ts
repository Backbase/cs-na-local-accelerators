import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export const MINIMUM_PASSWORD_LENGTH = 8;

const numbersRegex = new RegExp('[0-9]');
const upperCaseRegex = new RegExp('[A-Z]');
const specialCharactersRegex = new RegExp('[^A-Za-z0-9]');

export enum Validation {
  PasswordsMatch = 'passwordsMatch',
  PasswordMinLength = 'passwordMinLength',
  PasswordHasNumber = 'passwordHasNumber',
  PasswordHasUppercase = 'passwordHasUppercase',
  PasswordHasSpecialCharacter = 'passwordHasSpecialCharacter',
}

/**
 * here we have to be creative about writing "password match" validator.
 * in this implementation we are aware of the placement of our "new-password" component in our form
 * so we just get the right control (by a key) and compare it's value with what we are typing in the "confirm" field
 */
export function passwordsMatchValidator(control: AbstractControl) {
  const form: FormGroup | FormArray = control.parent;
  if (form) {
    const compareToKey = 'new-password'; // "new-password" is a "key" value matching the one from Formly fieldGroup
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
