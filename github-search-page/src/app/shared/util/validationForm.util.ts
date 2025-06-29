import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export function minLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (typeof value === 'string' && value.length < minLength) {
      return {
        minLength: {
          message: `Minimum length is ${minLength} characters, but got ${value.length}.`
        }
      };
    }
    return null; // No error
  };
}