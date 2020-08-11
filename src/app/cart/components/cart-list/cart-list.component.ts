import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { CartService } from '../../services/cart-list-service';
import { ProductModel } from 'src/app/products/models/product.model';

@Component({
  selector: 'app-cart-list-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-list.component.html'
})
export class CartListComponent implements OnInit {
  cartListProducts: BehaviorSubject<{ product: ProductModel, numberOfProducts: number}[]>;

  constructor(private ref: ChangeDetectorRef, public cartListService: CartService) {
      ref.detach();
      setInterval(() => {
        this.ref.detectChanges();
      }, 500);
   }

  ngOnInit(): void {
      this.cartListService.cartProducts.subscribe(
        data => this.cartListProducts = new BehaviorSubject<{ product: ProductModel, numberOfProducts: number}[]>(data)
      );
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
