import { Injectable } from '@angular/core';

import { ProductModel } from 'src/app/products/models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CartListService {
    inCartProducts = new BehaviorSubject<{ product: ProductModel, numberOfProducts: number}[]>(
        [{product: new ProductModel(5, "Milk", 10, true), numberOfProducts: 1}]
    );

    addProductToCart(product: ProductModel): void {
        const existingProduct = this.inCartProducts.value.find(p => p.product.id === product.id);
        if (existingProduct) {
           existingProduct.numberOfProducts++;
        } else {
            this.inCartProducts.next(this.inCartProducts.value.concat([{product: product, numberOfProducts: 1}]));
        }
    }

    removeProductFromCart(productId: number): void {
        let removedProduct = this.inCartProducts.getValue().find(p => p.product.id === productId);
        if (removedProduct.numberOfProducts > 1)
        {
            removedProduct.numberOfProducts--;
        } else {
            this.inCartProducts.next(this.inCartProducts.getValue().filter(p => p.product.id != productId));
        }
    }

    countProductsPrice(): number {
         let sum = 0;
         this.inCartProducts.value.forEach((val) => sum += val.product.price * val.numberOfProducts);

         return sum;
    }

    countNumberOfProducts(): number {
        let sum = 0;
        this.inCartProducts.value.forEach(product => sum += product.numberOfProducts);

        return sum;
    }
}
