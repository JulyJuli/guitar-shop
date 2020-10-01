import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { CartModel } from 'src/app/cart/models/cart.model';
import { CartService } from 'src/app/cart/services/cart-list-service';
import { AppState, ProductsState } from 'src/app/core/@ngrx_module';
import { selectProductsData } from 'src/app/core/@ngrx_module/products/products.selectors';
import { IProduct } from 'src/app/products/models/iproduct';
import * as ProductsActions from 'src/app/core/@ngrx_module/products/products.actions';
import { ProductModel } from 'src/app/products/models/product.model';
import { ProductService } from 'src/app/products/services/product-service';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  childSubscription: Subscription;
  products$: Observable<ReadonlyArray<IProduct>>;

  constructor(
    private router: Router,
    private cartService: CartService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(selectProductsData));
    this.store.dispatch(ProductsActions.getProducts());
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
    this.store.dispatch(ProductsActions.sortProductList({ columnName: sortKey }));
  }
}
