import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GeneratorService {
    private sourceCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    constructor() { }

    generate(sequenceLength: number): string {
        let result = '';
        const charactersLength = this.sourceCharacters.length;
        for (let i = 0; i < sequenceLength; i++ ) {
           result += this.sourceCharacters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
}
