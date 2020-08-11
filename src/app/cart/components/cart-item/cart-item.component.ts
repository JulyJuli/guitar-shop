import { Component, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { ProductModel } from 'src/app/products/models/product.model';

@Component({
  selector: 'app-cart-item-component',
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent implements OnDestroy {
  @Input() item: {product: ProductModel, numberOfProducts: number};
  @Output() deletedItemId = new EventEmitter<number>();

  ngOnDestroy(): void {
    // не встречал ранее такого варианта, что от аутпута надо отписываться
    this.deletedItemId.unsubscribe();
  }

  onDelete(): void {
    this.deletedItemId.emit(this.item.product.id);
  }
}
