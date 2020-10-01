import { IProduct } from 'src/app/products/models/iproduct';

export interface ProductsState {
  readonly data: ReadonlyArray<IProduct>;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialProductsState: ProductsState = {
    data: [],
    loaded: false,
    error: null
  };
