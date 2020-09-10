export class ProductModel {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public supplyDate: Date,
        public description: string,
        public linkToPicture: string,
        public isAvailable: boolean) { }
}
