import { Product } from '../models/product';
import { CartListService } from 'src/app/cart-list/services/cart-list-service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable() 
export class ProductService {
    isProductListChanged = new EventEmitter<void>();

    private availableProducts =  [
        new Product(1, 'Milk', 10, true),
        new Product(2, 'Coffee', 20, false),
        new Product(3, 'Candies', 5, true)
    ];

    constructor(public cartService: CartListService) {}

    getProducts(): Product[] {
        return this.availableProducts;
    }

    getProductById(productId: number): Product {
        return this.availableProducts.find(obj => obj.id === productId);
    }

    addProductToCart(product: Product) {
        this.availableProducts = this.availableProducts.filter(p => p !== product);
        this.cartService.addProductToCart(product);
        this.isProductListChanged.emit();
    }
}
