import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { ProductModel } from 'src/app/products/models/product.model';

@Component({
  selector: 'app-cart-item-component',
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent implements OnDestroy {
  @Input() item: {product: ProductModel, numberOfProducts: number};
  @Output() deletedItemId = new EventEmitter<number>();
  @Output() editedItem = new EventEmitter<{productId: number, productNumber: number}>();

  ngOnDestroy(): void {
    this.deletedItemId.unsubscribe();
  }

  onDelete(): void {
    this.deletedItemId.emit(this.item.product.id);
  }

  onItemFocusout(productId: number, newValue: string): void {
    this.editedItem.emit({productId, productNumber: +newValue});
  }
}
