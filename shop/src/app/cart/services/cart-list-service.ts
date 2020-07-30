import { Injectable, EventEmitter } from '@angular/core';

import { ProductModel } from 'src/app/product/models/product.model';

@Injectable()
export class CartListService {
    isCartChanged = new EventEmitter<void>();

    private inCartProducts = [
        new ProductModel(5, 'Milk', 10, true)
    ];

    getExistingProducts(): ProductModel[] {
        return this.inCartProducts;
    }

    addProductToCart(product: ProductModel): void {
        this.inCartProducts.push(product);
        this.isCartChanged.emit();
    }

    removeProductFromCart(product: ProductModel): void {
        this.inCartProducts = this.inCartProducts.filter(p => p !== product);
        this.isCartChanged.emit();
    }
}
