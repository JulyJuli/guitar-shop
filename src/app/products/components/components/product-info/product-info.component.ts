import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ProductModel } from 'src/app/products/models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/products/services/product-service';

@Component({
    selector: 'app-product-info-component',
    templateUrl: './product-info.component.html',
    styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit, OnDestroy {
    private subscription: Subscription;

    product: ProductModel;

    constructor(private activatedRouter: ActivatedRoute, private router: Router, private productService: ProductService) { }

    ngOnInit(): void {
       this.subscription = this.activatedRouter.params.subscribe(params => {
            const propertyName = 'productId';
            this.product = this.productService.getProductById(+params[propertyName]);
          });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onBackClick(): void {
        this.router.navigate(['product-list']);
    }

    onBuyClick(): void {
        this.productService.addProductToCart(this.product, 1);
    }

    onCartClick(): void {
        const link = ['/cart-list'];
        this.router.navigate(link);
      }
}
