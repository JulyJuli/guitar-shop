import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { BehaviorSubject, Subscription } from 'rxjs';

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
export class CartListComponent implements OnInit, OnDestroy {
  private columnToProductModelPropertyMap: { columnName: string, propertyName: string }[] = [
    { columnName: 'Name:', propertyName: 'name' },
    { columnName: 'Price:', propertyName: 'price' },
    { columnName: 'Counter:', propertyName: 'numberOfProducts' }
  ];

  private toggleSort = true;
  private subscription: Subscription;

  cartListProducts: BehaviorSubject<CartModel[]>;

  constructor(
    private ref: ChangeDetectorRef,
    private orderByPipe: OrderByPipe,
    public cartListService: CartService,
    private router: Router,
    private location: Location) {
      ref.detach();
      setInterval(() => {
        this.ref.detectChanges();
      }, 500);
  }

  ngOnInit(): void {
    this.subscription = this.cartListService.getCartProducts().subscribe(
      data => { this.cartListProducts = new BehaviorSubject<CartModel[]>(data); }
    );

    // подписка в подписке является антипатерном, надо использовать switchMap, concatMap - что больше подходит
    // и избавиться от вложеной подписки
    this.cartListService.isCartListChanged.subscribe(() =>
      this.cartListService.getCartProducts().subscribe(
        data => { this.cartListProducts = new BehaviorSubject<CartModel[]>(data); }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDeleteCartItem(removedCartItem: CartModel): void {
    this.cartListService.decreaseQuantity(removedCartItem, removedCartItem.numberOfProducts);
  }

  onBackClick(): void {
    this.location.back();
  }

  countTotalSum(): number {
    let sum = 0;
    this.cartListProducts.getValue().forEach((val) => sum += val.price * val.numberOfProducts);

    return sum;
  }

  countTotalQuantity(): number {
    let sum = 0;
    this.cartListProducts.getValue().forEach((val) => sum += val.numberOfProducts);

    return sum;
  }

  onCheckout(): void {
    this.router.navigate(['order']);
  }

  onEditItem(entry: { productId: number, productNumber: number }): void {
    this.cartListService.getCartProductById(entry.productId).then(existingItem => {
      entry.productNumber > existingItem.numberOfProducts
        ? this.cartListService.increaseQuantity(existingItem.id, entry.productNumber - existingItem.numberOfProducts)
        : this.cartListService.decreaseQuantity(existingItem, existingItem.numberOfProducts - entry.productNumber);

      this.cartListService.isCartListChanged.next();
    });
  }

  onLabelClick(columnName: string): void {
    const propertyName = this.columnToProductModelPropertyMap.find(x => x.columnName.indexOf(columnName) !== -1).propertyName;
    this.toggleSort = !this.toggleSort;
    const sortedCart = this.orderByPipe.transform(this.cartListProducts.value, propertyName, this.toggleSort);

    this.cartListProducts = new BehaviorSubject<CartModel[]>(sortedCart);
  }
}
