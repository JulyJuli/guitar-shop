import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CartModel } from '../../models/cart.model';

@Component({
  selector: 'app-cart-item-component',
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent {
  @Input() item: CartModel;
  @Output() deletedItemId = new EventEmitter<number>();
  @Output() editedItem = new EventEmitter<{productId: number, productNumber: number}>();

  onDelete(): void {
    this.deletedItemId.emit(this.item.id);
  }

  onItemFocusout(productId: number, newValue: string): void {
    this.editedItem.emit({productId, productNumber: +newValue});
  }
}
