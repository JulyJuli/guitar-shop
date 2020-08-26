import { Data } from '@angular/router';

export class ProductModel {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public supplyDate: Data, // не понял почему тут такой тип? эта не тип для даты
        public isAvailable: boolean) { }
}
