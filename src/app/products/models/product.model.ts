import { Data } from '@angular/router';

export class ProductModel {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public supplyDate: Data,
        public isAvailable: boolean) { }
}
