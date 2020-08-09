import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { CartListService } from '../../services/cart-list-service';
import { ProductModel } from 'src/app/products/models/product.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart-list-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-list.component.html'
})
export class CartListComponent implements OnInit {
  cartListProducts: BehaviorSubject<{ product: ProductModel, numberOfProducts: number}[]>;

  constructor(private ref: ChangeDetectorRef, public cartListService: CartListService) {
      ref.detach();
      setInterval(() => {
        this.ref.detectChanges();
      }, 500);
   }

  ngOnInit(): void {
      this.cartListService.inCartProducts.subscribe(
        data => this.cartListProducts = new BehaviorSubject<{ product: ProductModel, numberOfProducts: number}[]>(data)
      );
  }

  onDeleteProduct(removedProductId: number) {
    this.cartListService.removeProductFromCart(removedProductId);
  }
}
