import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap, pluck, switchMap } from 'rxjs/operators';
import { CartService } from 'src/app/cart/services/cart-list-service';
import { ProductModel } from 'src/app/products/models/product.model';
import { ProductService } from 'src/app/products/services/product-service';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects implements OnInitEffects {
  getProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProducts),
      switchMap((action) =>
        this.productsService
          .getProducts()
          .toPromise()
          .then((products) => ProductsActions.getProductsSuccess({ products }))
          .catch((error) => ProductsActions.getProductsError({ error }))
      )
    )
  );

  sortProductList$: Observable<Action> = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductsActions.sortProductList),
    switchMap((action) =>
      this.productsService
        .getProducts()
        .toPromise()
        .then((products) => {
          this.sortingService.transform(products, action.columnName);
          return ProductsActions.getSortedProductsSuccess({ products });
        })
        .catch((error) => ProductsActions.getProductsError({ error }))
    )
  ));

  // deleteProduct$: Observable<Action> = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ProductsActions.deleteProduct),
  //     pluck('product'),
  //     concatMap((product: IProduct) =>
  //       this.productsService
  //         .addProductToDb(product)
  //         .then((removedProduct: IProduct) => {
  //           return ProductsActions.deleteProductSuccess({
  //             product: removedProduct,
  //           });
  //         })
  //         .catch((error) => ProductsActions.deleteProductError({ error }))
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private productsService: ProductService,
    private cartService: CartService,
    private sortingService: OrderByPipe
  ) {
    console.log('[PRODUCTS EFFECTS]');
  }

  ngrxOnInitEffects(): Action {
    console.log('ngrxOnInitEffects is called');
    return { type: '[ProductsEffects]: Init' };
  }
}
