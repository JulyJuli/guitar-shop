import { Directive, HostListener } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appEmailContentValidator][formControlName], [appEmailContentValidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailContentValidatorDirective,
      multi: true
    }
  ]
})
export class EmailContentValidatorDirective implements Validator {
  @HostListener('focusout')
  validate(c: AbstractControl): { [key: string]: boolean } | null {
    return c?.value === 'qwerty@com.ua' ? {emailInvalid: true } : null;
  }
}
