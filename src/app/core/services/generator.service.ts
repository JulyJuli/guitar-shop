export class GeneratorService {
    private sourceCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    generate(sequenceLength: number): string {
        let result = '';    
        const charactersLength = this.sourceCharacters.length;
        for (let i = 0; i < sequenceLength; i++ ) {
           result += this.sourceCharacters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
}
