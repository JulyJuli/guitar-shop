import { Injectable, EventEmitter } from "@angular/core";
import { ProductModel } from 'src/app/products/models/product.model';

@Injectable()
export class ProductRepository {
    isAvailableProductListChanged = new EventEmitter<void>();

    private availableProducts: {product: ProductModel, numberOfAvailableProducts: number}[] =  [
        {product: new ProductModel(5, 'Milk', 10, true), numberOfAvailableProducts: 10},
        {product: new ProductModel(2, 'Coffee', 20, true), numberOfAvailableProducts: 5},
        {product: new ProductModel(3, 'Candies', 5, true), numberOfAvailableProducts: 2}
     ];
 
     getProducts(): ProductModel[] {
        return this.availableProducts.map(p => p.product);
    }

    decreaseNumberOfSpecificProduct(productId: number) {
        const existingProduct = this.availableProducts.find(p => p.product.id === productId);
        existingProduct.numberOfAvailableProducts--;
        if (existingProduct.numberOfAvailableProducts === 0) {
            existingProduct.product.isAvailable = false;
        }
    }

    increaseNumberOfSpecificProduct(product: ProductModel) {
        const existingProduct = this.availableProducts.find(p => p.product.id === product.id);
        if (existingProduct) {
            existingProduct.numberOfAvailableProducts++;
            existingProduct.product.isAvailable = true;
        }

        this.isAvailableProductListChanged.emit();
    }
}