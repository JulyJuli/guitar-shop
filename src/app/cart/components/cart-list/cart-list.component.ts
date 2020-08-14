import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { CartService } from '../../services/cart-list-service';
import { ProductModel } from 'src/app/products/models/product.model';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';

@Component({
  selector: 'app-cart-list-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-list.component.html',
  providers: [OrderByPipe]
})
export class CartListComponent implements OnInit, OnDestroy {
  cartListProducts: BehaviorSubject<{ product: ProductModel, numberOfProducts: number}[]>;

  constructor(private ref: ChangeDetectorRef, private orderByPipe: OrderByPipe, public cartListService: CartService) {
      ref.detach();
      setInterval(() => {
        this.ref.detectChanges();
      }, 500);
   }

  ngOnInit(): void {
      this.cartListService.cartProducts.subscribe(
        data => {

          // I can demonstrate pipe usage for cart only this way because of numberOfProducts property
          const sortedCart = this.orderByPipe.transform(data.map(p => p.product), 'name');
          this.cartListProducts = new BehaviorSubject<{ product: ProductModel, numberOfProducts: number}[]>(
            sortedCart.map(p => {
              const numberOfProduct = data.find(d => d.product.id === p.id).numberOfProducts;
              return {product: p, numberOfProducts: numberOfProduct};
            })
          ); }
      );
  }

  ngOnDestroy(): void {
      this.cartListService.cartProducts.unsubscribe();
  }

  onDeleteProduct(removedProductId: number) {
    const existingItem = this.cartListService.cartProducts.value.find(p => p.product.id === removedProductId);

    this.cartListService.decreaseQuantity(existingItem.product, 1);
  }

  onEditItem(entry: {productId: number, productNumber: number}): void {
    const existingItem = this.cartListService.cartProducts.value.find(p => p.product.id === entry.productId);

    entry.productNumber > existingItem.numberOfProducts
    ? this.cartListService.increaseQuantity(existingItem.product, entry.productNumber - existingItem.numberOfProducts)
    : this.cartListService.decreaseQuantity(existingItem.product, existingItem.numberOfProducts - entry.productNumber);
  }
}
