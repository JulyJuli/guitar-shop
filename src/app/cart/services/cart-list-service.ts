import { Injectable } from '@angular/core';

import { ProductModel } from 'src/app/products/models/product.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductRepository } from 'src/app/shared/repositories/product-repository';

@Injectable()
export class CartService {
    cartProducts = new BehaviorSubject<{ product: ProductModel, numberOfProducts: number}[]>(
        [{product: new ProductModel(1, 'Jackson JS22 JS-Series Dinky, Natural Oil', 200, true), numberOfProducts: 1}]
    );

    totalSum = new Subject<number>();
    totalQuantity = new Subject<number>();

    constructor(private productRepository: ProductRepository) {}

    increaseQuantity(product: ProductModel, numberOfProducts: number): void {
        const existingProduct = this.cartProducts.value.find(p => p.product.id === product.id);

        if (numberOfProducts === 0) {
            this.removeProduct(product.id, 0);
        } else {
            existingProduct
            ? this.addProduct(existingProduct.product, numberOfProducts)
            : this.addProduct(product, numberOfProducts);
        }

        this.productRepository.decreaseNumberOfSpecificProduct(product.id, numberOfProducts);
        this.updateCartData();
    }

    decreaseQuantity(product: ProductModel, numberOfProducts: number): void {
        this.removeProduct(product.id, numberOfProducts);

        this.productRepository.increaseNumberOfSpecificProduct(product, numberOfProducts);
        this.updateCartData();
    }

    removeAllProducts(): void {
        this.cartProducts.value.forEach(item =>
            this.productRepository.increaseNumberOfSpecificProduct(item.product, item.numberOfProducts));
        this.cartProducts.next([]);

        this.updateCartData();
    }

    countTotalSum(): number {
         let sum = 0;
         this.cartProducts.value.forEach((val) => sum += val.product.price * val.numberOfProducts);

         return sum;
    }

    countTotalQuantity(): number {
        let sum = 0;
        this.cartProducts.value.forEach(product => sum += product.numberOfProducts);

        return sum;
    }

    private addProduct(product: ProductModel, numberOfProducts: number): void {
        const existingProduct = this.cartProducts.value.find(p => p.product.id === product.id);
        existingProduct
         ? existingProduct.numberOfProducts += numberOfProducts
         : this.cartProducts.next(this.cartProducts.value.concat([{product, numberOfProducts}]));
    }

    private updateCartData(): void {
        this.totalQuantity.next(this.countTotalQuantity());
        this.totalSum.next(this.countTotalSum());
    }

    private removeProduct(productId: number, numberOfProducts: number): void {
        const removedProduct = this.cartProducts.getValue().find(p => p.product.id === productId);

        removedProduct.numberOfProducts < numberOfProducts
        ? this.cartProducts.next(this.cartProducts.getValue().filter(p => p.product.id !== productId))
        : removedProduct.numberOfProducts -= numberOfProducts;
    }

}
