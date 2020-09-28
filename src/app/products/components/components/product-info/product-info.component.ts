import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ProductModel } from 'src/app/products/models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/products/services/product-service';
import { CartService } from 'src/app/cart/services/cart-list-service';
import { CartModel } from 'src/app/cart/models/cart.model';

@Component({
    selector: 'app-product-info-component',
    templateUrl: './product-info.component.html',
    styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
    private propertyName = 'productId';

    product: ProductModel;

    constructor(
        private activatedRouter: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private cartService: CartService) { }

    ngOnInit(): void {
       this.activatedRouter.params.pipe(
        switchMap(params => this.productService.getProductById(+params[this.propertyName])))
        .subscribe(p => this.product = p);
    }

    onBackClick(): void {
        this.router.navigate(['product-list']);
    }

    onBuyClick(): void {
       this.cartService.addProductToCart(new CartModel(this.product.id, this.product.name, this.product.price, 0), 1);
    }

    onCartClick(): void {
        const link = ['/cart-list'];
        this.router.navigate(link);
      }
}
