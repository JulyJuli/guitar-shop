import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { CartModel } from 'src/app/cart/models/cart.model';

import { CartService } from 'src/app/cart/services/cart-list-service';
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
  currentProductList: ProductModel[];

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private sortingService: OrderByPipe) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products: ProductModel[]) => this.currentProductList = products);
    this.childSubscription = this.productService.isProductListChanged.subscribe(
      () => this.productService.getProducts().subscribe((products: ProductModel[]) => this.currentProductList = products));
  }

  ngOnDestroy(): void {
    this.childSubscription.unsubscribe();
  }

  onBuyProduct(product: ProductModel): void {
    this.cartService.addProductToCart(new CartModel(product.id, product.name, product.price, 0), 1);
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
