import { Injectable, EventEmitter } from '@angular/core';

import { ProductModel } from '../models/product.model';
import { CartListService } from 'src/app/cart/services/cart-list-service';
import { ProductRepository } from 'src/app/shared/repositories/product-repository';

@Injectable()
export class ProductService {
    isProductListChanged = new EventEmitter<void>();

    private availableProducts: ProductModel[] = [];

    constructor(private cartService: CartListService, private productRepository: ProductRepository) {
        this.availableProducts = this.productRepository.getProducts();
        this.productRepository.isAvailableProductListChanged.subscribe(
            () => this.availableProducts = this.productRepository.getProducts());
     }

    getProducts(): ProductModel[] {
        return this.availableProducts;
    }

    getProductById(productId: number): ProductModel {
        return this.availableProducts.find(product => product.id === productId);
    }

    addProductToCart(product: ProductModel) {
        this.cartService.addProductToCart(product);
        this.productRepository.decreaseNumberOfSpecificProduct(product.id);
        this.isProductListChanged.emit();
    }
}
