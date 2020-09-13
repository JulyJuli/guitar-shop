import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CartModel } from '../../models/cart.model';

@Component({
  selector: 'app-cart-item-component',
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent {
  @Input() item: CartModel;
  @Output() deletedItem = new EventEmitter<CartModel>();
  @Output() editedItem = new EventEmitter<{productId: number, productNumber: number}>();

  onDelete(): void {
    this.deletedItem.emit(this.item);
  }

  onItemFocusout(productId: number, newValue: string): void {
    this.editedItem.emit({productId, productNumber: +newValue});
  }
}
