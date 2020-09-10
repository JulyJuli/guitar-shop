import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { CartService } from '../../services/cart-list-service';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';
import { CartModel } from '../../models/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
  providers: [OrderByPipe]
})
export class CartListComponent implements OnInit {
  private columnToProductModelPropertyMap: { columnName: string, propertyName: string } [] = [
    { columnName: 'Name:', propertyName: 'name' },
    { columnName: 'Price:', propertyName: 'price' },
    { columnName: 'Counter:', propertyName: 'numberOfProducts'}
  ];

  private toggleSort = true;

  cartListProducts: BehaviorSubject<CartModel[]>;

  constructor(
    private ref: ChangeDetectorRef,
    private orderByPipe: OrderByPipe,
    public cartListService: CartService,
    private router: Router) {
      ref.detach();
      setInterval(() => {
        this.ref.detectChanges();
      }, 500);
   }

  ngOnInit(): void {
      this.cartListService.cartProducts.subscribe(
        data => { this.cartListProducts = new BehaviorSubject<CartModel[]>(data); }
      );
  }

  onDeleteProduct(removedProductId: number) {
    const existingItem = this.cartListService.cartProducts.value.find(p => p.id === removedProductId);

    this.cartListService.decreaseQuantity(existingItem, 1);
  }

  onBackClick(): void {
    this.router.navigate(['product-list']);
  }

  onCheckout(): void {
    this.router.navigate(['order']);
  }

  onEditItem(entry: {productId: number, productNumber: number}): void {
    const existingItem = this.cartListService.cartProducts.value.find(p => p.id === entry.productId);

    entry.productNumber > existingItem.numberOfProducts
    ? this.cartListService.increaseQuantity(existingItem, entry.productNumber - existingItem.numberOfProducts)
    : this.cartListService.decreaseQuantity(existingItem, existingItem.numberOfProducts - entry.productNumber);
  }

  onLabelClick(columnName: string): void {
    const propertyName = this.columnToProductModelPropertyMap.find(x => x.columnName.indexOf(columnName) !== -1).propertyName;
    this.toggleSort = !this.toggleSort;
    const sortedCart = this.orderByPipe.transform(this.cartListProducts.value, propertyName, this.toggleSort);

    this.cartListProducts = new BehaviorSubject<CartModel[]>(sortedCart);
  }
}
