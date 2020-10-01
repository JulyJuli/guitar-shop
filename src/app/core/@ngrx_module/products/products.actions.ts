import { createAction, props } from '@ngrx/store';
import { CartModel } from 'src/app/cart/models/cart.model';
import { IProduct } from 'src/app/products/models/iproduct';

export const getProducts = createAction(
  '[Product List Page (App)] GET_PRODUCTS'
);

export const getProductsSuccess = createAction(
  '[Get Products Effect] GET_PRODUCTS_SUCCESS',
  props<{ products: ReadonlyArray<IProduct> }>()
);

export const sortProductList = createAction(
  '[Get Sorted Products Effect] GET_SORTED_PRODUCTS',
  props<{ columnName: string }>()
);

export const getSortedProductsSuccess = createAction(
  '[Get Sorted Products Effect] GET_SORTED_PRODUCTS_SUCCESS',
  props<{ products: ReadonlyArray<IProduct> }>()
);

export const getProductsError = createAction(
  '[Get Products Effect] GET_PRODUCTS_ERROR',
  props<{ error: Error | string }>()
);

export const buyProduct = createAction(
  '[Buy Product Effect] BUY_PRODUCT',
  props<{ cartItem: CartModel, numberOfProducts: number }>()
);

export const onBuyProductSuccess = createAction(
  '[Buy Product Effect] BUY_PRODUCT_SUCCESS',
  props<{ products: ReadonlyArray<IProduct> }>()
);

export const onBuyProductError = createAction(
  '[Buy Product Effect] BUY_PRODUCT_ERROR',
  props<{ error: Error | string }>()
);
