import { Component, OnInit } from '@angular/core';

import { ProductModel } from 'src/app/products/models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/products/services/product-service';

@Component({
    selector: 'app-product-info-component',
    templateUrl: './product-info.component.html',
    styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

    product: ProductModel;

    constructor(private activatedRouter: ActivatedRoute, private router: Router, private productService: ProductService) { }

    ngOnInit(): void {
       this.activatedRouter.params.subscribe(params => {
            const propertyName = 'productId';
            this.product = this.productService.getProductById(+params[propertyName]);
          });
    }

    onBackClick(): void {
        this.router.navigate(['product-list']);
    }
}
