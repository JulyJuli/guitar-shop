import { Action, createReducer, on } from '@ngrx/store';

import * as ProductsActions from './products.actions';
import { initialProductsState, ProductsState } from './products.state';

const reducer = createReducer(
  initialProductsState,
  on(ProductsActions.getProducts, (state) => {
    console.log('GET_PRODUCTS action being handled!');
    return { ...state };
  }),
  on(ProductsActions.getProductsSuccess, (state, { products }) => {
    console.log('GET_PRODUCTS_SUCCESS action being handled!');
    const data = [...products];

    console.log(data);
    return {
      ...state,
      data,
      loaded: true,
    };
  }),
  on(ProductsActions.getProductsError, (state, { error }) => {
    console.log('GET_PRODUCTS_ERROR action being handled!');
    return {
      ...state,
      loaded: false,
      error,
    };
  }),
  on(ProductsActions.sortProductList, (state) => {
    console.log('SORT_PRODUCT_LIST action being handled!');
    return { ...state };
  }),
  on(ProductsActions.getSortedProductsSuccess, (state, { products }) => {
    console.log('GET_SORTED_LIST_SUCCESS action being handled!');
    const data = products;

    return {
      ...state,
      data,
    };
  }),
  on(ProductsActions.buyProduct, (state) => {
    console.log('BUY_PRODUCT action being handled!');
    return { ...state };
  }),
  on(ProductsActions.onBuyProductSuccess, (state, { products }) => {
    console.log('ON_BUY_PRODUCT_SUCCESS action being handled!');
    const data = products;

    return {
      ...state,
      data,
    };
  }),
  on(ProductsActions.onBuyProductError, (state, { error }) => {
    console.log('ON_BUY_PRODUCT_ERROR action being handled!');
    return {
      ...state,
      loaded: false,
      error,
    };
  }),
);

export function productsReducer(
  state: ProductsState | undefined,
  action: Action
): any {
  return reducer(state, action);
}
