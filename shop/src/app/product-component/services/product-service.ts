import { Product } from '../models/product';
export class ProductService {
    public getProducts(): Product[] {
        return [
            new Product('Milk', 10, true),
            new Product('Coffee', 20, false),
            new Product('Candies', 5, true)
        ];
    }
}