import { Injectable, EventEmitter } from '@angular/core';
import { ProductModel } from 'src/app/products/models/product.model';

@Injectable()
export class ProductRepository {
    isAvailableProductListChanged = new EventEmitter<void>();

    private availableProducts: {product: ProductModel, numberOfAvailableProducts: number}[] =  [
        {product: new ProductModel(1, 'Jackson JS22 JS-Series Dinky, Natural Oil', 200, true), numberOfAvailableProducts: 10},
        {product: new ProductModel(2, 'Dean MLX Flame Top, Trans Red', 520, true), numberOfAvailableProducts: 5},
        {product: new ProductModel(3, 'Ibanez JEM Junior Steve Vai, White', 440, true), numberOfAvailableProducts: 2}
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

        this.isAvailableProductListChanged.emit();
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
