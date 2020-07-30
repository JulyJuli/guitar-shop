import { Injectable, EventEmitter } from '@angular/core';

import { Product } from 'src/app/product-component/models/product';

@Injectable()
export class CartListService {
    isCartChanged = new EventEmitter<void>();

    private inCartProducts = [
        new Product(5, 'Milk', 10, true)
    ];

    getExistingProducts(): Product[] {
        return this.inCartProducts;
    }

    addProductToCart(product: Product): void {
        this.inCartProducts.push(product);
        this.isCartChanged.emit();
    }

    removeProductFromCart(product: Product): void {
        this.inCartProducts = this.inCartProducts.filter(p => p !== product);
        this.isCartChanged.emit();
    }
}
