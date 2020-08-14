import { Injectable, EventEmitter } from '@angular/core';
import { ProductModel } from 'src/app/products/models/product.model';

@Injectable()
export class ProductRepository {
    isAvailableProductListChanged = new EventEmitter<void>();

    private availableProducts: {product: ProductModel, numberOfAvailableProducts: number}[] =  [
        {product:
            new ProductModel(1, 'Jackson JS22 JS-Series Dinky, Natural Oil', 200, new Date(2020, 3, 15), true),
            numberOfAvailableProducts: 100},
        {product:
            new ProductModel(2, 'Dean MLX Flame Top, Trans Red', 520,  new Date(2019, 3, 15), true),
            numberOfAvailableProducts: 50},
        {product:
            new ProductModel(3, 'Ibanez JEM Junior Steve Vai, White', 440, new Date(2020, 6, 5), true),
            numberOfAvailableProducts: 20}
     ];

     getProducts(): ProductModel[] {
        return this.availableProducts.map(p => p.product);
    }

    decreaseNumberOfSpecificProduct(productId: number, numberOfProducts: number) {
        const existingProduct = this.availableProducts.find(p => p.product.id === productId);
        existingProduct.numberOfAvailableProducts > numberOfProducts
            ? existingProduct.numberOfAvailableProducts -= numberOfProducts
            : existingProduct.numberOfAvailableProducts = 0;

        if (existingProduct.numberOfAvailableProducts === 0) {
            existingProduct.product.isAvailable = false;
        }

        this.isAvailableProductListChanged.emit();
    }

    increaseNumberOfSpecificProduct(product: ProductModel, numberOfProducts: number) {
        const existingProduct = this.availableProducts.find(p => p.product.id === product.id);
        if (existingProduct) {
            existingProduct.numberOfAvailableProducts += numberOfProducts;
            existingProduct.product.isAvailable = true;
        }

        this.isAvailableProductListChanged.emit();
    }
}
