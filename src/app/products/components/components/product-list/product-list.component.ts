import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { ProductModel } from 'src/app/products/models/product.model';
import { ProductService } from 'src/app/products/services/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  childSubscription: Subscription;
  productList: Observable<ProductModel[]>;
  currentProductList: ProductModel[];

  constructor(
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.productList = this.productService.getProducts();
    this.childSubscription = this.productService.isProductListChanged.subscribe(
      () => this.productList = this.productService.getProducts());
    this.productList.subscribe((products: ProductModel[]) => this.currentProductList = products);
  }

  ngOnDestroy(): void {
    this.childSubscription.unsubscribe();
  }

  onBuyProduct(product: ProductModel): void {
    this.productService.addProductToCart(product, 1);
  }

  onCartClick(): void {
    const link = ['/cart-list-component'];
    this.router.navigate(link);
  }

  onViewClick(product: ProductModel): void {
    const link = ['/product-info', product.id];
    this.router.navigate(link, { state: product });
  }
}
