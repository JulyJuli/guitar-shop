import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { ProductModel } from 'src/app/products/models/product.model';
import { ProductService } from 'src/app/products/services/product-service';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';

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
    private productService: ProductService,
    private sortingService: OrderByPipe) { }

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
    const link = ['/cart-list'];
    this.router.navigate(link);
  }

  onViewClick(productId: number): void {
    const link = ['/product-info', productId];
    this.router.navigate(link);
  }

  onSortChange(sortKey: string) {
    this.sortingService.transform(this.currentProductList, sortKey);
  }
}
