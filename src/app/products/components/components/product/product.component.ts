import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { ProductModel } from 'src/app/products/models/product.model';

@Component({
  selector: 'app-product-component',
  templateUrl: './product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() sourceProduct: ProductModel;
  @Output() boughtProduct = new EventEmitter<ProductModel>();

  constructor(private ref: ChangeDetectorRef) {
    ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 500);
 }

  onBuy(): void {
    if (this.sourceProduct.isAvailable) {
      console.log(`OnBuy was clicked for ${this.sourceProduct.name}`);
      this.boughtProduct.emit(this.sourceProduct);
    }
  }
}
