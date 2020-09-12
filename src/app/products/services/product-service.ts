import { Injectable, EventEmitter, OnDestroy } from '@angular/core';

import { of, Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { ProductModel } from '../models/product.model';
import { CartService } from 'src/app/cart/services/cart-list-service';
import { ProductRepository } from 'src/app/shared/repositories/product-repository';
import { CartModel } from 'src/app/cart/models/cart.model';

@Injectable()
export class ProductService implements OnDestroy {
    private subscription: Subscription;

    isProductListChanged = new EventEmitter<void>();

    private availableProducts: Observable<ProductModel[]>;

    constructor(private cartService: CartService, private productRepository: ProductRepository) {
        this.availableProducts = of(this.productRepository.getProducts());
        this.subscription = this.productRepository.isAvailableProductListChanged.subscribe(
            () => this.availableProducts = of(this.productRepository.getProducts()));
     }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getProducts(): Observable<ProductModel[]> {
        return this.availableProducts;
    }

    getProductById(id: number): any {
        let product: ProductModel;
        this.availableProducts.subscribe(products => product = products.find(p => p.id === id));

        return product;
    }

    addProductToCart(product: ProductModel, numberOfProducts: number) {
        this.cartService.increaseQuantity(new CartModel(product.id, product.name, product.price, 1), numberOfProducts);
        this.isProductListChanged.emit();
    }
}
