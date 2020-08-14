import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ProductRepository } from 'src/app/shared/repositories/product-repository';
import { CartLazyModule } from '../cart-lazy.module';
import { CartModel } from '../models/cart.model';

@Injectable({
    providedIn: CartLazyModule
})
export class CartService {
    cartProducts = new BehaviorSubject<CartModel[]>([new CartModel(1, 'Jackson JS22 JS-Series Dinky, Natural Oil', 200, 2)]);

    totalSum: number;
    totalQuantity: number;

    constructor(private productRepository: ProductRepository) {
        this.updateCartData();
    }

    increaseQuantity(product: CartModel, numberOfProducts: number): void {
        const existingProduct = this.cartProducts.value.find(p => p.id === product.id);

        if (numberOfProducts === 0) {
            this.removeProduct(product.id, 0);
        } else {
            existingProduct
            ? this.addProduct(existingProduct, numberOfProducts)
            : this.addProduct(product, numberOfProducts);
        }

        this.productRepository.decreaseNumberOfSpecificProduct(product.id, numberOfProducts);
        this.updateCartData();
    }

    decreaseQuantity(product: CartModel, numberOfProducts: number): void {
        this.removeProduct(product.id, numberOfProducts);

        this.productRepository.increaseNumberOfSpecificProduct(product.id, numberOfProducts);
        this.updateCartData();
    }

    removeAllProducts(): void {
        this.cartProducts.value.forEach(item =>
            this.productRepository.increaseNumberOfSpecificProduct(item.id, item.numberOfProducts));
        this.cartProducts.next([]);

        this.updateCartData();
    }

    countTotalSum(): number {
         let sum = 0;
         this.cartProducts.value.forEach((val) => sum += val.price * val.numberOfProducts);

         return sum;
    }

    countTotalQuantity(): number {
        let sum = 0;
        this.cartProducts.value.forEach(product => sum += product.numberOfProducts);

        return sum;
    }

    private addProduct(product: CartModel, numberOfProducts: number): void {
        const existingProduct = this.cartProducts.value.find(p => p.id === product.id);

        existingProduct
         ? existingProduct.numberOfProducts += numberOfProducts
         : this.cartProducts.next(this.cartProducts.value.concat([product]));
    }

    private updateCartData(): void {
        this.totalQuantity = this.countTotalQuantity();
        this.totalSum = this.countTotalSum();
    }

    private removeProduct(productId: number, numberOfProducts: number): void {
        const removedProduct = this.cartProducts.getValue().find(p => p.id === productId);

        removedProduct.numberOfProducts <= numberOfProducts
        ? this.cartProducts.next(this.cartProducts.getValue().filter(p => p.id !== productId))
        : removedProduct.numberOfProducts -= numberOfProducts;
    }
}
