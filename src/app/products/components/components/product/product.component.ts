import { Component, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { ProductModel } from 'src/app/products/models/product.model';

@Component({
  selector: 'app-product-component',
  templateUrl: './product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ['./product.component.css']
})
export class ProductComponent implements OnDestroy {
  @Input() sourceProduct: ProductModel;
  @Output() boughtProduct = new EventEmitter<ProductModel>();

  constructor(private ref: ChangeDetectorRef) {
    ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 500);
 }

  ngOnDestroy(): void {
    this.boughtProduct.unsubscribe();
  }

  onBuy(): void {
    if (this.sourceProduct.isAvailable) {
      console.log(`OnBuy was clicked for ${this.sourceProduct.name}`);
      this.boughtProduct.emit(this.sourceProduct);
    }
  }
}
