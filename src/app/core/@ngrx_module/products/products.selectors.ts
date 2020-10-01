import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IProduct } from 'src/app/products/models/iproduct';
import { ProductModel } from 'src/app/products/models/product.model';
import { selectRouterState } from '../router';
import { ProductsState } from './products.state';

export const selectProductsState = createFeatureSelector<ProductsState>(
  'products'
);

export const selectProductsData = createSelector(
  selectProductsState,
  (state: ProductsState) => state.data
);

export const selectSelectedProductByUrl = createSelector(
  selectProductsData,
  selectRouterState,
  (products, router): IProduct => {
    const id = router.state.params.id;

    return id ? products[id] as ProductModel : new ProductModel(
      5,
      'tmp',
      125,
      new Date(),
      'tmp',
      'tmp',
      false,
      0);
  });

