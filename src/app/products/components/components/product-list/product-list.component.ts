import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CartModel } from 'src/app/cart/models/cart.model';
import { CartService } from 'src/app/cart/services/cart-list-service';
import { AppState } from 'src/app/core/@ngrx_module';
import { selectProductsData } from 'src/app/core/@ngrx_module/products/products.selectors';
import { IProduct } from 'src/app/products/models/iproduct';
import * as ProductsActions from 'src/app/core/@ngrx_module/products/products.actions';
import { ProductModel } from 'src/app/products/models/product.model';
import * as RouterActions from 'src/app/core/@ngrx_module/router/router.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$: Observable<ReadonlyArray<IProduct>>;

  constructor(
    private router: Router,
    private cartService: CartService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(selectProductsData));
    this.store.dispatch(ProductsActions.getProducts());
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
    this.store.dispatch(RouterActions.go(
      {
        path: link
      })
    );
  }

  onSortChange(sortKey: string) {
    this.store.dispatch(ProductsActions.sortProductList({ columnName: sortKey }));
  }
}
