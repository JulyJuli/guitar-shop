import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable()
export class OrderValidationService {
    private validationMessagesMap = {
        email: {
            required: 'Please enter your email address.',
            pattern: 'Please enter a valid email address.',
            email: 'Please enter a valid email address.',
            emailInvalid: 'This email already exists. Please enter other email address.'
        }
    };

    public setEmailValidationMessage(c: AbstractControl, controlName: string): string {
        let validationMessage = '';

        if ((c.touched || c.dirty) && c.errors) {
            validationMessage = Object.keys(c.errors)
                .map(key => this.validationMessagesMap[controlName][key])
                .join(' ');
        }

        return validationMessage;
    }

    public nameValidator(c: AbstractControl): { [key: string]: boolean } | null {
       return c.value ? null : { wrongName: true };
    }

    public isFormControlValid(controlName: string, formGroup: FormGroup): boolean {
        return (formGroup.get(controlName).touched || formGroup.get(controlName).dirty)
        && !formGroup.get(controlName).valid;
    }
}
