import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { ProductService } from 'src/app/products/services/product-service';
import { CartModel } from '../models/cart.model';

@Injectable()
export class CartService {
    private cartUrl = 'http://localhost:3000/cart';
    private options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    isCartListChanged = new Subject<void>();

    constructor(private productService: ProductService, private http: HttpClient) { }

    getCartProducts(): Observable<CartModel[]> {
        return this.http.get<CartModel[]>(this.cartUrl);
    }

    getCartProductById(id: number): Promise<CartModel> {
        const url = `${this.cartUrl}/${id}`;

        return this.http
            .get(url)
            .toPromise()
            .then(response => response as CartModel);
    }

    addProductToCart(cartItem: CartModel, numberOfProducts: number) {
        this.getCartProducts().subscribe(products => {
            products.find(p => p.id === cartItem.id)
                ? this.increaseQuantity(cartItem.id, numberOfProducts)
                : this.createCartProduct(cartItem).subscribe(() => this.increaseQuantity(cartItem.id, numberOfProducts));

            this.isCartListChanged.next();
        });
    }

    increaseQuantity(cartItemId: number, numberOfProducts: number): void {
        this.getCartProductById(cartItemId).then(cartItem => {
            numberOfProducts === 0
            ? this.removeProductFromCart(cartItem.id, 0)
            : cartItem.numberOfProducts += numberOfProducts;

            this.productService.decreaseNumberOfSpecificProduct(cartItem.id, numberOfProducts);
            this.updateCart(cartItem).subscribe();
        });
    }

    decreaseQuantity(product: CartModel, numberOfProducts: number): void {
        this.removeProductFromCart(product.id, numberOfProducts);
        this.productService.increaseNumberOfSpecificProduct(product.id, numberOfProducts);
    }

    removeAllProducts(): void {
        this.getCartProducts().subscribe(products => {
            products.forEach(item => {
                this.deleteCartItem(item.id);
                this.productService.increaseNumberOfSpecificProduct(item.id, item.numberOfProducts);
            });
            this.isCartListChanged.next();
        });
    }

    deleteCartItem(id: number): void {
        const url = `${this.cartUrl}/${id}`;
        this.http.delete(url).subscribe();
    }

    private removeProductFromCart(productId: number, numberOfProducts: number): void {
        this.getCartProductById(productId).then(product => {
            product.numberOfProducts <= numberOfProducts
                ? product.numberOfProducts -= product.numberOfProducts
                : product.numberOfProducts -= numberOfProducts;

            product.numberOfProducts > 0
                ? this.updateCart(product).subscribe()
                : this.deleteCartItem(productId);

            this.isCartListChanged.next();
        });
    }

    private updateCart(cartItem: CartModel): Observable<CartModel> {
        const url = `${this.cartUrl}/${cartItem.id}`;
        const body = JSON.stringify(cartItem);

        return this.http.put<CartModel>(url, body, this.options);
    }

    private createCartProduct(cartItem: CartModel): Observable<CartModel> {
        const body = JSON.stringify(cartItem);

        return this.http.post<CartModel>(this.cartUrl, body, this.options);
    }
}
