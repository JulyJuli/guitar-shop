import { Injectable, EventEmitter, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { ProductModel } from '../models/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProductService implements OnDestroy {
    private productUrl = 'http://localhost:3000/products';
    private subscription: Subscription;

    isProductListChanged = new EventEmitter<void>();

    constructor(private http: HttpClient) { }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getProducts(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(this.productUrl);
    }

    getProductById(id: number): Promise<ProductModel> {
        const url = `${this.productUrl}/${id}`;

        return this.http
            .get(url)
            .toPromise()
            .then(response => response as ProductModel);
    }

    decreaseNumberOfSpecificProduct(productId: number, numberOfProducts: number): void {
        this.getProductById(productId).then(existingProduct => {
            existingProduct.numberOfAvailableProducts > numberOfProducts
                ? existingProduct.numberOfAvailableProducts -= numberOfProducts
                : existingProduct.numberOfAvailableProducts = 0;

            if (existingProduct.numberOfAvailableProducts === 0) {
                existingProduct.isAvailable = false;
            }

            this.updateProduct(existingProduct).then(() => this.isProductListChanged.emit());
        });
    }

    increaseNumberOfSpecificProduct(productId: number, numberOfProducts: number) {
        this.getProductById(productId).then(existingProduct => {
            if (existingProduct) {
                existingProduct.numberOfAvailableProducts += numberOfProducts;
                existingProduct.isAvailable = true;
            }

            this.updateProduct(existingProduct).then(() => this.isProductListChanged.emit());
        });
    }

    private updateProduct(update: ProductModel): Promise<ProductModel> {
        const url = `${this.productUrl}/${update.id}`;
        const body = JSON.stringify(update);
        const options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http
            .put(url, body, options)
            .toPromise()
            .then(response => response as ProductModel);
    }
}
