import { Injectable, EventEmitter } from '@angular/core';

import { ProductModel } from '../models/product.model';
import { CartListService } from 'src/app/cart/services/cart-list-service';

@Injectable()
export class ProductService {
    isProductListChanged = new EventEmitter<void>();

    private availableProducts =  [
        new ProductModel(1, 'Milk', 10, true),
        new ProductModel(2, 'Coffee', 20, false),
        new ProductModel(3, 'Candies', 5, true)
    ];

    constructor(private cartService: CartListService) {}

    getProducts(): ProductModel[] {
        return this.availableProducts;
    }

    getProductById(productId: number): ProductModel {
        return this.availableProducts.find(obj => obj.id === productId);
    }

    addProductToCart(product: ProductModel) {
        this.availableProducts = this.availableProducts.filter(p => p !== product);
        this.cartService.addProductToCart(product);
        this.isProductListChanged.emit();
    }
}
